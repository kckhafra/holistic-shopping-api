const bcrypt = require('bcryptjs')

const UsersService = {
    hasUserWithUserName(db, user_name) {
        return db('holistic_users')
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
      validatePassword(password) {
        if (password.length < 8) {
          return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
          }
      },

}

module.exports = UsersService