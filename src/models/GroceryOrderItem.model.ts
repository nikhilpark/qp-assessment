import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

interface GroceryOrderItemAttributes {
    quantity: number;
    item_code: string;  // Corrected to string
    order_id: number;
}

class GroceryOrderItem extends Model<GroceryOrderItemAttributes> {
    quantity!: number;
    item_code!: string;
    order_id!: number; 
}

GroceryOrderItem.init({
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    item_code: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'grocery_order_items',
});


export default GroceryOrderItem;
