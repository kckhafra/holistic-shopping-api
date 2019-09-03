const bcrypt = require('bcryptjs')

const UsersService = {
    hasUserWithUserName(db, user_name) {
        return db('blogful_users')
          .where({ user_name })
          .first()
          .then(user => !!user)
      },
    postUser(db, newUser){
        return db
            .insert(newUser)
            .into('holistic_users')
            .returning('*')
            
            
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
      },

}

module.exports = UsersService