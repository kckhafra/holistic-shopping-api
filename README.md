# Holistic Health Shop
- Returns json data about all products
- Returns json data and post data for a specific product
- Returns data that has been edited


## URL
- /api/products
- /api/guest-products
- /api/auth
- /api/users

## Method:
- GET
- POST
- DELETE
- PATCH

## Data Params
#### Login Credentials Payload
- {username: "holistic", password: "holistic"}
#### Products Payload
- { description: "description"
images: "image"
price: "number"
product_category: "category"
remaining_inventory: "inventory"
service_name: "name"}

## Success Response: 
- Code: 200
- Content: { description: "description"
images: "image"
price: "number"
product_category: "category"
remaining_inventory: "inventory"
service_name: "name"}

## Error Response
- Code: 404 NOT FOUND
Content {error: "Wrong user name or password"}
OR
- Code: 401 UNAUTHORIZED
Content: {error: "unauthorized to make request"}


