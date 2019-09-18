const express = require('express');
const jsonBodyParser = express.json()
const checkoutRouter = express.Router()

checkoutRouter
    .route('/')
    .post( async (req, res) => {
        try {
          let {status} = await stripe.charges.create({
            amount: 2000,
            currency: "usd",
            description: "An example charge",
            source: req.body
          });
      
          res.json({status});
        } catch (err) {
          res.status(500).end();
        }
      });
module.exports = checkoutRouter
  
