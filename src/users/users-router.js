const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const bcrypt = require('bcryptjs')

usersRouter
    .post('/', jsonBodyParser, (req, res, next)=>{
        const {full_name, email, user_name, password} = req.body
       const newUser = {full_name, email, user_name}
       const db = req.app.get('db')
       
       const passwordError = UsersService.validatePassword(password)
       if (passwordError) return res.status(400).json({error: passwordError})

       UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
            )
             .then(hasUserWithUserName => {
               if (hasUserWithUserName)
                 return res.status(400).json({ error: `Username already taken` })

       
             })

      bcrypt.hash(password, 12)
        .then((hash)=>{
            newUser.password=hash

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
    })

module.exports = usersRouter