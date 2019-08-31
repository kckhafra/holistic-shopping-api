const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next)=>{
        const {full_name, email, user_name, password} = req.body
        console.log(req.body)
        const newUser = {full_name, email, user_name, password}
        const db = req.app.get('db')

    for (const field of ['full_name', "email",'user_name', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
        return UsersService.postUser(
            db, newUser
        )
        .then(user=>{
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(user)
        })
        .catch(next)
    })

module.exports = usersRouter