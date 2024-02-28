
# Groccerry API


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
	  - [Admin Endpoints](#admin)
		  - [Add Grocery Item](#add-grocery-item)
		  - [Remove Grocery Item](#remove-grocery-item)
		  - [View Grocery Items](#view-grocery-items)
		  - [Update Grocery Item](#update-grocery-item)
		  - [Manage Inventory](#manage-inventory)
		  - [Get Orders](#get-orders)
	  - [User Endpoints](#user)
	 

## Getting Started

### Prerequisites
Node.js 


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

### Admin
### 1. Add Grocery Item 
 ### Endpoint : `POST /api/addGroceryItem` 
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

### 2. Remove Grocery Item
  
### Endpoint : `POST /api/removeGroceryItem`
#### Description: This endpoint allows the removal of an existing grocery item from the system.
#### Request
-  **Method:**  `POST` 
 -  **Content-Type:**  `application/json`  
 -  **Body:**  
		 -  `item_code` (string): Unique code assigned to the grocery item.

### 3. View Grocery Items  
### Endpoint:  `GET /api/viewGroceryItems`  
#### Description:  This endpoint retrieves a list of all grocery items from the system. 
#### Request  
-  **Method:**  `GET`  
-  **Content-Type:**  `application/json`

### 4. Update Grocery Item
### Endpoint:  `POST /api/updateGroceryItem`
#### Description:  This endpoint allows the update of an existing grocery item in the system. 
#### Request  -  
   -  **Method:**  `POST`  
   -  **Content-Type:**  `application/json`  
   -  **Body:**  -  `item_code` (string): Unique code assigned to the grocery item. 
						   -  `updateParameters` (object): Object containing fields to update.
								    Allowed fields: 'item_name', 'item_price', 'item_description'.

### 5. Manage Inventory  
### Endpoint:  `POST /api/manageInventory`
#### Description:  This endpoint allows the management of the inventory for a given grocery item. 
#### Request  
-  **Method:**  `POST`  
-  **Content-Type:**  `application/json`  
-  **Body:**  
	 -  `item_code` (string): Unique code assigned to the grocery item. 
	 -  `action` (string): Action to perform on the inventory ('increase' or 'decrease'). 
	 -  `quantity` (number): Quantity to increase or decrease. Should be a non-zero number.

### 6. Get Orders  
### Endpoint:   `GET /api/getOrders`  
#### Description:  This endpoint retrieves a list of all grocery orders placed by users along with their details.
#### Request  
-  **Method:**  `GET`  
-  **Content-Type:**  `application/json`
