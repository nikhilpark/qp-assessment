
# Grocery API


## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Setting Up the Database](#setting-up-the-database)
  - [Running the Application](#running-the-application)
- [Dockerization](#dockerization)
  - [Building Docker Image](#building-docker-image)
  - [Running Docker Container](#running-docker-container)
 - [Documentation](#documentation)
	  - [Admin Endpoints](#admin-endpoints)
		  - [Add Grocery Item](#add-grocery-item)
		  - [Remove Grocery Item](#remove-grocery-item)
		  - [View Grocery Items](#view-grocery-items)
		  - [Update Grocery Item](#update-grocery-item)
		  - [Manage Inventory](#manage-inventory)
		  - [Get Orders](#get-orders)
	  - [User Endpoints](#user-endpoints)
	      - [Get Available Grocery Items](#get-available-grocery-items)
	      - [Place An Order](#place-an-order)
	 

## Getting Started
Tools used:

typescript, express, sqlite3, sequelize


### Prerequisites
node.js, npm


### Installing Dependencies

```bash
# Install project dependencies
npm install
```
### Setting Up the Database

```bash
#Seed the database
npm run seed
```

### Running the Application

```bash
# Run the application
npm start
```
## Dockerization

### Building Docker image

```bash
docker build -t qp-assessment .
```

### Running Docker Container

```bash
docker run -p 3000:3000 qp-assessment
```

## Documentation

### Admin Endpoints
## Add Grocery Item
### Endpoint : `POST /admin/addGroceryItem` 
#### Description:  This endpoint allows the addition of a new grocery item to the system. 
#### Request  
-  **Method:**  `POST`
-  **Content-Type:**  `application/json`
-  **Body:**
	 -  `item_name` (string): Name of the grocery item.
	 -  `item_price` (number): Price of the grocery item.
	 -  `item_quantity` (number): Quantity of the grocery item.
	 -  `item_description` (string): Description of the grocery item.
	 -  `item_code` (string): Unique code assigned to the grocery item.

## Remove Grocery Item
  
### Endpoint : `POST /admin/removeGroceryItem`
#### Description: This endpoint allows the removal of an existing grocery item from the system.
#### Request
-  **Method:**  `POST` 
 -  **Content-Type:**  `application/json`  
 -  **Body:**  
		 -  `item_code` (string): Unique code assigned to the grocery item.

## View Grocery Items  
### Endpoint:  `GET /admin/viewGroceryItems`  
#### Description:  This endpoint retrieves a list of all grocery items from the system. 
#### Request  
-  **Method:**  `GET`  
-  **Content-Type:**  `application/json`

## Update Grocery Item
### Endpoint:  `POST /admin/updateGroceryItem`
#### Description:  This endpoint allows the update of an existing grocery item in the system. 
#### Request  -  
   -  **Method:**  `POST`  
   -  **Content-Type:**  `application/json`  
   -  **Body:**
       -    `item_code` (string): Unique code assigned to the grocery item.
       -   `updateParameters` (object): Object containing fields to update.
                        Allowed fields: 'item_name', 'item_price', 'item_description'.

## Manage Inventory  
### Endpoint:  `POST /admin/manageInventory`
#### Description:  This endpoint allows the management of the inventory for a given grocery item. 
#### Request  
-  **Method:**  `POST`  
-  **Content-Type:**  `application/json`  
-  **Body:**
	 -  `item_code` (string): Unique code assigned to the grocery item. 
	 -  `action` (string): Action to perform on the inventory ('increase' or 'decrease'). 
	 -  `quantity` (number): Quantity to increase or decrease. Should be a non-zero number.

## Get Orders  
### Endpoint:   `GET /admin/getOrders`  
#### Description:  This endpoint retrieves a list of all grocery orders placed by users along with their details.
#### Request  
-  **Method:**  `GET`  
-  **Content-Type:**  `application/json`


### User Endpoints

## Get Available Grocery Items  
### Endpoint:   `GET /user/getGroceryItems`  
#### Description:  This endpoint retrieves a list of available grocery items that have a positive quantity in the inventory. 
#### Request  
-  **Method:**  `GET`  
-  **Content-Type:**  `application/json`

## Place an Order  
### Endpoint:  `POST /user/placeAnOrder`  
#### Description:  This endpoint allows users to place a new grocery order. 
#### Request  
-  **Method:**  `POST`  
-  **Content-Type:**  `application/json`  
-  **Body:**
    -  `items` (array of objects): List of items to be ordered. 
          -  `item_code` (string): Unique code assigned to the grocery item.
          - `item_quantity` (number): Quantity of the grocery item to be ordered
