import { Request, Response } from "express";
import GroceryItem, { IGroceryItem } from "../models/GroceryItem.model";
import GroceryOrder, { IOrderRequest } from "../models/GroceryOrder.model";
import GroceryOrderItem from "../models/GroceryOrderItem.model";
import Sequelize from "sequelize";
import sequelize from '../config/sequelize';


export class UserController {


    public async getGroceryItems(req: Request, res: Response) {
        try {
            let allItems: IGroceryItem[] = await GroceryItem.findAll({
                where: {
                    item_quantity: {
                        [Sequelize.Op.gt]: 0
                    }
                },
                attributes: ['item_name', 'item_price', 'item_description', 'item_quantity', 'item_code'],

            });

            if (allItems.length === 0) {
                return res.status(404).json({ success: false, message: "No grocery items avaialble at the moment" });
            }

            res.json({ success: true, items: allItems });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

    public async placeAnOrder(req: Request, res: Response) {
        try {
            const { items }: IOrderRequest = req.body;

            if (!items || items.length === 0 || !items.every((item) => item.item_code && item.item_quantity)) {
                return res.status(400).json({ success: false, message: 'Invalid order. Each item should have item_code and item_quantity' });
            }

            const itemDetailsPromises = items.map(async (item) => {
                const itemDetails = await GroceryItem.findOne({ where: { item_code: item.item_code } });
                if (!itemDetails) {
                    throw ({ customError: `Item with code ${item.item_code} not found`, statusCode: 404 })
                }

                if (itemDetails.item_quantity < item.item_quantity) {
                    throw ({ customError: `Insufficient stock for item with code ${item.item_code}`, statusCode: 400 })

                }

                return {
                    ...itemDetails.toJSON(),
                    quantity: item.item_quantity,
                };
            });

            const itemDetails = await Promise.all(itemDetailsPromises);

            const orderPrice = itemDetails.reduce((total, item) => total + item.item_price * item.quantity, 0);

            const order = await GroceryOrder.create({ order_price: orderPrice });


            const orderItemsPromises = itemDetails.map((item) => {
                console.log('Created Order:',{
                    quantity: item.quantity,
                    item_code: item.item_code,
                    order_id: order.order_id,
                } );
                return GroceryOrderItem.create({
                    quantity: item.quantity,
                    item_code: item.item_code,
                    order_id: order.order_id,
                });
            });

            await Promise.all(orderItemsPromises);

            const updateInventoryPromises = itemDetails.map(async (item) => {
                return GroceryItem.decrement('item_quantity', {
                    by: item.quantity,
                    where: { item_code: item.item_code },
                });
            });

            await Promise.all(updateInventoryPromises);

            return res.json({ success: true, message: "Order placed successfully", totalPrice: orderPrice });
        } catch (err: any) {
            console.error(err);
            let message = err.customError || "Unexpected error occured"
            let statusCode = err.statusCode || 500
            return res.status(statusCode).json({ success: false, message: message });
        }
    }

}

