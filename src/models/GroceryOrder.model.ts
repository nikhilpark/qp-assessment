import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';


export interface IOrderBody {
    item_code: string;
    item_quantity: number;
}

export interface IOrderRequest {
    items: IOrderBody[];
}

class GroceryOrder extends Model {
    order_id!: number;
    order_price!: number;
}

GroceryOrder.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
           
        },
        order_price: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0
            }
        },
    },
    {
        sequelize,
        tableName: 'grocery_orders',
    }
);


export default GroceryOrder;
