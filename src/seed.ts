
//@ts-nocheck
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite3'
}); // Replace with your SQLite database connection


const generateRandomPrice = () => {
  return parseFloat((Math.random() * (10 - 0.5) + 0.5).toFixed(2));
};

const generateRandomQuantity = () => {
  return Math.floor(Math.random() * (100 - 10 + 1) + 10);
};

const generateGroceryItems = (count) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const item = {
      id: i + 1,
      item_name: `Item${i + 1}`,
      item_price: (i + 1) * 1.5,  // Adjust as needed
      item_quantity: Math.floor(Math.random() * 50) + 10,  // Random quantity between 10 and 60
      item_code: `ITEM${i + 1}`,
    };
    items.push(item);
  }
  return items;
};

const generateGroceryOrdersAndItems = (items) => {
  const orders = [];
  const orderItems = [];

  items.forEach((item) => {
    const order = {
      order_id: orders.length + 1,
      order_price: 0,
    };

    // Random quantity between 1 and item_quantity
    const quantity = Math.floor(Math.random() * item.item_quantity) + 1;

    const orderItem = {
      quantity,
      item_code: item.item_code,
      order_id: order.order_id,
    };

    // Update order price based on the calculated item price
    order.order_price += item.item_price * quantity;

    orders.push(order);
    orderItems.push(orderItem);
  });

  return { orders, orderItems };
};

const generateSeedData = () => {

  const groceryItems = [
    {
      "item_name": "Organic Eggs (Dozen)",
      "item_price": 4.49,
      "item_quantity": 22,
      "item_code": "FREEREGG001",
      "item_description": "A dozen free-range, organic and farm-fresh eggs",

    },
    {
      "item_name": "Banana Bundle",
      "item_price": 1.29,
      "item_quantity": 14,
      "item_code": "BANBND001",
      "item_description": "A bundle of ripe and sweet bananas"

    },
    {
      "item_name": "Organic Gala Apples",
      "item_price": 2.49,
      "item_quantity": 25,
      "item_code": "ORGAPL001",
      "item_description": "Fresh, organic Gala apples from local farms"

    },
    {
      "item_name": "Organic Whole Milk",
      "item_price": 3.99,
      "item_quantity": 15,
      "item_code": "ORGMILK001",
      "item_description": "Organic whole milk from grass-fed cows"

    },
    {
      "item_name": "Whole Grain Bread",
      "item_price": 2.79,
      "item_quantity": 30,
      "item_code": "WGHBREAD001",
      "item_description": "Nutritious whole grain bread with seeds"

    }
  ]

  const groceryOrders = [
    {
      "order_price": 33.42
    },
    {
      "order_price": 43.38
    },
    {
      "order_price": 67.41

    }
  ]

  const groceryOrderItems = [
    {
      "quantity": 3,
      "item_code": "FREEREGG001",
      "order_id": 1

    },
    {
      "quantity": 5,
      "item_code": "ORGMILK001",
      "order_id": 1

    },
    {
      "quantity": 12,
      "item_code": "BANBND001",
      "order_id": 2

    },
    {
      "quantity": 10,
      "item_code": "WGHBREAD001",
      "order_id": 2

    },
    {
      "quantity": 25,
      "item_code": "ORGAPL001",
      "order_id": 3

    },
    {
      "quantity": 4,
      "item_code": "BANBND001",
      "order_id": 3

    }
  ]

  return {
    groceryItems,
    groceryOrders,
    groceryOrderItems
  };
};



const seedData = generateSeedData();
console.log(seedData);

const seedDatabase = async () => {
  try {
    // Connect to the database
    await sequelize.authenticate();

    // Define your models with explicit table names
    const GroceryItem = sequelize.define('GroceryItem', {
      item_name: Sequelize.STRING,
      item_price: Sequelize.FLOAT,
      item_quantity: Sequelize.INTEGER,
      item_description:Sequelize.STRING,
      item_code: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
    }, { tableName: 'grocery_items' }); // Explicit table name

    const GroceryOrder = sequelize.define('GroceryOrder', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_price: Sequelize.FLOAT,
    }, { tableName: 'grocery_orders' }); // Explicit table name

    const GroceryOrderItem = sequelize.define('GroceryOrderItem', {
      quantity: Sequelize.INTEGER,
      item_code: Sequelize.STRING,
      order_id: Sequelize.INTEGER,
    }, { tableName: 'grocery_order_items' }); // Explicit table name

    // Set 
    GroceryOrderItem.belongsTo(GroceryOrder, { foreignKey: 'order_id' });
    GroceryOrderItem.belongsTo(GroceryItem, { foreignKey: 'item_code' });

    GroceryOrder.hasMany(GroceryOrderItem, { foreignKey: 'order_id', as: 'orderItems' });

    // Synchronize the models with the database
    await sequelize.sync({ force: true });

    // Insert demo data into the database
    await GroceryItem.bulkCreate(seedData.groceryItems);
    await GroceryOrder.bulkCreate(seedData.groceryOrders);
    await GroceryOrderItem.bulkCreate(seedData.groceryOrderItems);

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

// Run the seed function
seedDatabase();
