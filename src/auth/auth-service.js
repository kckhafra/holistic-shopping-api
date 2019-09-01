
const bcrypt = require('bcryptjs')


const AuthService = {
    getUserWithUserName(db, user_name){
        return db
        .from('holistic_users')
        .where({user_name})
        .first()
    },
    comparePasswords(password, hash){
        return bcrypt.compare(password,hash)
        
    },
  
    }

    

    module.exports = AuthService