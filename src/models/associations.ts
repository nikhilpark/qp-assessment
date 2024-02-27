import GroceryOrder from "./GroceryOrder.model";
import GroceryOrderItem from "./GroceryOrderItem.model";
import GroceryItem from "./GroceryItem.model";

GroceryOrder.hasMany(GroceryOrderItem, { foreignKey: 'order_id', as: 'orderItems' });
GroceryOrderItem.belongsTo(GroceryOrder, { foreignKey: 'order_id' });
GroceryOrderItem.belongsTo(GroceryItem, { foreignKey: 'item_code' }); // Add this association
