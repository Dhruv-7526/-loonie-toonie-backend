# Loonie Toonie Dollar Store – MongoDB Backend Project

## Overview
This project is a backend system for the Loonie Toonie Dollar Store.  
It uses MongoDB, Node.js, Express, and Postman to perform CRUD operations and test API endpoints.

The database includes:
- products
- stores
- employees
- customers
- orders

Total documents: 45+ (requirement: 35+)

---

## How to Run the Project

### 1. Start MongoDB
If using local MongoDB:
```
net start MongoDB
```
Or open MongoDB Compass.

### 2. Install dependencies
```
npm install
```

### 3. Start the backend
```
node server.js
```

Expected output:
```
Connected to MongoDB, DB: loonieToonieDB
Server running on port 3000
```

---

## API Endpoints

Base URL:
```
http://localhost:3000/api
```

### Create Product (POST)
```
POST /api/products
```
Example body:
```json
{
  "productID": 20,
  "name": "Mop",
  "price": 6.99,
  "category": "Household"
}
```

### Get All Products (GET)
```
GET /api/products
```

### Get Product by ID (GET)
```
GET /api/products/:id
```

### Update Product (PUT)
```
PUT /api/products/:id
```

### Delete Product (DELETE)
```
DELETE /api/products/:id
```

---

## Postman Testing
All five API operations were tested in Postman:
- POST
- GET
- GET by ID
- PUT
- DELETE

---

## MongoDB Queries
The project includes 15 required MongoDB queries:
- insertOne
- insertMany
- find
- updateOne
- updateMany
- deleteOne
- deleteMany
- 3 aggregation queries
- sorting
- indexing
- text search
- regex query
- transaction example

---

## GitHub
This repository contains:
- server.js  
- package.json  
- README.md  
- All backend code  

Github Repo: https://github.com/Dhruv-7526/-loonie-toonie-backend
---



## Conclusion
This project demonstrates MongoDB database design, CRUD operations, REST API development, and Postman testing for the Loonie Toonie Dollar Store.

