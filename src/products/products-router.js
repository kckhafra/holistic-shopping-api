const express = require('express');
const ProductsService = require('./products-service')
const path = require('path')
const productRouter = express.Router()
const jsonBodyParser = express.json()
const {requireAuth} = require('../middleware/jwt-auth')

productRouter
    .route('/')
    // .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        const authToken = req.get('Authorization')||''
        console.log(`authToken:${authToken}`)
        ProductsService.getAllProducts(db)
            .then(products=>{
                res.json(products)
            })
            .catch(next)
  
    })
    .post(jsonBodyParser, (req,res,next)=>{
        const db = req.app.get('db')
        const { service_name, price, remaining_inventory, description, product_category } = req.body
        const newProducts = { service_name, price, remaining_inventory, description, product_category}

        for(const [key, value] of Object.entries(newProducts))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

                newProducts.user_id = req.user_id
                console.log(`newProduct.user_id: ${newProducts.user_id}`)
        
        

        
        ProductsService.postProduct(db, newProducts)
            .then(products=>{
                res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${products.id}`))
                .json(products)
            })
    
            .catch(next)
    })

    productRouter
        .route('/:product_id')
        .get((req,res,)=>{
            const db = req.app.get('db')
            ProductsService.getProductsById(db, req.params.product_id)
            .then(product=>{
                res.json(product)
            })
        })

    module.exports = productRouter