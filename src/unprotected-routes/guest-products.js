const express = require('express');
const guestProductRouter = express.Router()
const ProductsService = require('../products/products-service')


guestProductRouter
        .route('/')
        .get((req,res,next)=>{
            console.log(`params Please: ${req.query.search_term}`)
            const db = req.app.get('db')
            if (!req.query.search_term){
                    const db = req.app.get('db')
                    return ProductsService.getAllProducts(db)
                        .then(products=>{
                            res.json(products)
                        })
                        .catch(next)
            }else
            ProductsService.getProductsBySearch(db, req.query.search_term)
            .then(product=>{
                
                if(!product){
                    return res.status(404).json({
                        error: {message: 'product does not exist'}
                    })
                }else res.json(product)
            })
        })

guestProductRouter
        .route('/:product_id')
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

        

module.exports = guestProductRouter