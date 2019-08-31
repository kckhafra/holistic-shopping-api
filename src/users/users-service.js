const UsersService = {
    postUser(db, newUser){
        return db
            .insert(newUser)
            .into('holistic_users')
            .returning('*')
            
    }
}

module.exports = UsersService