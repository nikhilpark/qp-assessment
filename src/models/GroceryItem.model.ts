import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

// Define IGroceryItem interface directly in the file
export interface IGroceryItem extends Model {
    item_name: string;
    item_price?: number;
    item_quantity: number;
    item_code: string;
    id?: number;
    item_description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class GroceryItem extends Model {
    item_name!: string;
    item_price!: number | undefined;
    item_quantity!: number;
    item_code!: string;
    id!: number | undefined;
    item_description!: string;
    createdAt!: Date | undefined;
    updatedAt!: Date | undefined;
}

GroceryItem.init({
    item_name: DataTypes.STRING,
    item_price: {
        type: DataTypes.FLOAT,
        validate: {
            min: 0
        }
    },
    item_quantity: DataTypes.INTEGER,
    item_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    item_description: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'grocery_items',
});

export default GroceryItem