const ProductsService = {
    getAllProducts(db) {
        return db
            .select('*')
            .from('holistic_users_inventory')
            
    },
    getMyProducts(db, user_id, searchTerm){
        return db
        .select('*')
        .from('holistic_users_inventory')
        .where('user_id', user_id )
        
    },
    searchMyProducts(db, user_id, searchTerm){
        return db
        .select('*')
        .from('holistic_users_inventory')
        .where('service_name', 'ILIKE', `%${searchTerm}%`)
        .andWhere('user_id', user_id )
    },
    getProductsById(db, params_id) {
            return db
            .select('*')
            .from('holistic_users_inventory')
            .where('id', params_id)
        },
    getProductsBySearch(db, searchTerm) {
            return db
            .select('*')
            .from('holistic_users_inventory')
            .where('service_name', 'ILIKE', `%${searchTerm}%`)
        },
    postProduct(db, newProduct) {
        return db
        .insert(newProduct)    
        .into('holistic_users_inventory')
        .returning('*')
       
    },
    deleteProduct(db, id){
        return db
        .from('holistic_users_inventory')
        .where({id})
        .delete()
    },
    updateProduct(db, id, newProductFields){
        return db('holistic_users_inventory')
            .where({id})
            .update(newProductFields)
        }
    
    
    
    

}

module.exports = ProductsService