const express = require('express');
const ProductsService = require('./products-service')
const path = require('path')
const productRouter = express.Router()
const jsonBodyParser = express.json()
const {requireAuth} = require('../middleware/jwt-auth')
const AuthService = require('../auth/auth-service')
  
  

productRouter
    .route('/')
    .all(requireAuth)
    .get((req,res,next)=>{
        const db = req.app.get('db')
        ProductsService.getAllProducts(db)
            .then(products=>{
                res.json(products)
            })
            .catch(next)
  
    })
    .post(jsonBodyParser, (req,res,next)=>{
        const authToken = req.get('Authorization')||''
        const bearerToken = authToken.slice(7, authToken.length)
        const payload = AuthService.verifyJwt(bearerToken)
        const user_id = payload.user_id
        const db = req.app.get('db')
        const { service_name, price, remaining_inventory, description, product_category } = req.body
        const newProducts = { user_id, service_name, price, remaining_inventory, description, product_category}

        for(const [key, value] of Object.entries(newProducts))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        ProductsService
            .postProduct(db, newProducts)
            .then(products=>{
                res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${products.id}`))
                .json(products)
            })
    
            .catch(next)
    })
     
        
    productRouter
    .route('/my')
    .all(requireAuth)
    .get((req,res,next)=>{
        const authToken = req.get('Authorization')||''
        const bearerToken = authToken.slice(7, authToken.length)
        const payload = AuthService.verifyJwt(bearerToken)
        const user_id = payload.user_id
        const db = req.app.get('db')
        ProductsService.getMyProducts(db, user_id)
            .then(products=>{
                res.json(products)
            })
            .catch(next)
  
    })

    productRouter
        .route('/:product_id')
        .all(requireAuth)
        .get((req,res,)=>{
            const db = req.app.get('db')
            ProductsService.getProductsById(db, req.params.product_id)
            .then(product=>{
                if(!product){
                    return res.status(404).json({
                        error: {message: 'product does not exist'}
                    })
                }else res.json(product)
            })
        })
        .delete((req,res,next)=>{
            const db = req.app.get('db')
            ProductsService.deleteProduct(db, req.params.product_id)
                .then(product=>{
                    res.status(204).end()
                })
        
        })
        .patch(jsonBodyParser, (req,res, next)=>{
            const {service_name,price,remaining_inventory,description,product_category} = req.body
            const productUpdate = { service_name,price,remaining_inventory,description,product_category}
            ProductsService.updateProduct(
                req.app.get('db'),
                req.params.product_id,
                productUpdate      
            )
                .then((updatedProduct)=>{
                    res
                    .status(201)
                    .json(updatedProduct)
                })
                .catch(next)
        })
        

    module.exports = productRouter