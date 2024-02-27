import { Request, Response } from "express";
import GroceryItem, { IGroceryItem } from "../models/GroceryItem.model";
import { Sequelize } from 'sequelize';
import GroceryOrder from "../models/GroceryOrder.model";
import GroceryOrderItem from "../models/GroceryOrderItem.model";

export class AdminController {
    public async addGroceryItem(req: Request, res: Response) {
        try {
            const { item_name, item_price, item_quantity, item_description, item_code } = req.body;
            if (!item_name || !item_price || !item_quantity || !item_description || !item_code) {
                return res.status(400).json({ success: false, message: "Invalid request" });
            }

            const item: IGroceryItem | null = await GroceryItem.findOne({ where: { item_code } })!;
            if (item) {
                return res.status(409).json({
                    success: false,
                    message: "This item is already in our system. If you want to update its quantity, please use the manage inventory API."
                });
            } else {
                await GroceryItem.create({
                    item_name,
                    item_price,
                    item_quantity,
                    item_description,
                    item_code,
                });
            }
            res.status(201).json({ success: true, message: `Item with code ${item_code} added succesfully` });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

    public async removeGroceryItem(req: Request, res: Response) {
        try {
            const { item_code } = req.body
            if (!item_code) {
                return res.status(400).json({ success: false, message: "Invalid request" });
            }

            const item: IGroceryItem | null = await GroceryItem.findOne({ where: { item_code } })!;
            if (!item) {
                return res.status(409).json({
                    success: false,
                    message: `Item with code ${item_code} does not exist in our system`
                });
            }

            await GroceryItem.destroy({ where: { item_code } })

            res.json({ success: true, message: `Item with code ${item_code} deleted succesfully` })


        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

    public async viewGroceryItems(req: Request, res: Response) {
        try {
            let allItems: IGroceryItem[] = await GroceryItem.findAll({});
            if (allItems.length === 0) {
                return res.status(404).json({ success: false, message: "No grocery items found" });
            }
            res.json({ success: true, items: allItems });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

    public async updateGroceryItem(req: Request, res: Response) {
        try {
            const { item_code, updateParameters } = req.body
            if (!item_code || !updateParameters) {
                return res.status(400).json({ success: false, message: "Invalid request" });
            }

            if (typeof updateParameters !== 'object' || Object.keys(updateParameters).length == 0) {
                return res.status(400).json({ success: false, message: "Invalid update parameters" });

            }


            const item: IGroceryItem | null = await GroceryItem.findOne({ where: { item_code } })!;
            if (!item) {
                return res.status(409).json({
                    success: false,
                    message: `Item with code ${item_code} does not exist in our system`
                });
            }

            const allowedKeys = ['item_name', 'item_price', 'item_description'];
            const isValidUpdate = Object.keys(updateParameters).every(key => allowedKeys.includes(key));

            if (!isValidUpdate) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid update parameters. Only 'item_name', 'item_price', and 'item_description' are allowed."
                });
            }

            Object.assign(item, updateParameters);

            await item.save();

            res.json({ success: true, message: `Item with code ${item_code} updated succesfully` })



        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }
    public async manageInventory(req: Request, res: Response) {
        try {
            const { item_code, action } = req.body;
            let { quantity } = req.body
            quantity = Number(quantity)
            if (!item_code || !action || !quantity) {
                return res.status(400).json({ success: false, message: "Invalid request" });
            }

            if (isNaN(quantity) || quantity === 0) {
                return res.status(400).json({ success: false, message: "Invalid request, quantity should be a non zero number" });

            }
            const item: IGroceryItem | null = await GroceryItem.findOne({ where: { item_code } })!;
            if (!item) {
                return res.status(409).json({
                    success: false,
                    message: `Item with code ${item_code} does not exist in our system`
                });
            }
            if (action === 'increase') {
                item.item_quantity += quantity;
            } else if (action === 'decrease') {
                if (item.item_quantity < quantity) {
                    return res.status(400).json({
                        success: false,
                        message: `Not enough inventory for item with code ${item_code}`
                    });
                }
                item.item_quantity -= quantity;
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Invalid action. Use 'increase' or 'decrease'"
                });
            }

            await item.save();

            return res.status(200).json({
                success: true,
                message: `Inventory of item with code ${item_code} has been updated successfully`,
                data: { item_code, item_quantity: item.item_quantity },
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

    public async getOrders(req: Request, res: Response) {
        try {
            const orders = await GroceryOrder.findAll({
                include: [{
                    model: GroceryOrderItem,
                    as: 'orderItems',
                    attributes: ['quantity', 'item_code'],
                    include: [{
                        model: GroceryItem,
                        attributes: ['item_name', 'item_price'],
                    }],
                }],
                attributes: ['order_id', 'order_price', 'createdAt'], // Add any other attributes you want to include from GroceryOrder
                order: [['createdAt', 'DESC']], // Order by createdAt in descending order
            });
            if (orders.length === 0) {
                return res.status(404).json({ success: false, message: "No orders found" });
            }
            res.json({ success: true, orders });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Unexpected error occurred" });
        }
    }

}