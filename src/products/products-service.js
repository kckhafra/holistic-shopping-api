const ProductsService = {
    getAllProducts(db) {
        return db
            .select('*')
            .from('holistic_users_inventory')
            
    },
    getProductsById(db, params_id) {
            return db
            .select('*')
            .from('holistic_users_inventory')
            .where('id', params_id)
        },
    postProduct(db, newProduct) {
        return db
        .insert(newProduct)    
        .into('holistic_users_inventory')
        .returning('*')
        // .where('user_id', newProducts.user_id)
    },
    

}

module.exports = ProductsService