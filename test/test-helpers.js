const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
      {
        id: 1,
        user_name: 'test-user-1',
        full_name: 'Test user 1',
        email: 'email1',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 2,
        user_name: 'test-user-2',
        full_name: 'Test user 2',
        email: 'email2',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 3,
        user_name: 'test-user-3',
        full_name: 'Test user 3',
        email: 'email3',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
      {
        id: 4,
        user_name: 'test-user-4',
        full_name: 'Test user 4',
        email: 'email4',
        password: 'password',
        date_created: new Date('2029-01-22T16:28:32.615Z'),
      },
    ]
  }

  function makeProductsArray(users) {
    return [
      {
        id: 1,
        user_id: users[0].id,
        service_name: 'First test post!',
        price: 20,
        remaining_inventory: 4,
        description: "First description",
        product_category: "category_one",
        
      },
      {
        id: 2,
        user_id: users[1].id,
        service_name: 'Second test post!',
        price: 20,
        remaining_inventory: 4,
        description: 'First description',
        product_category: "category_two",
        
        
      },
      {
        id: 3,
        user_id: users[2].id,
        service_name: 'Third test post!',
        price: 20,
        remaining_inventory: 4,
        description: 'First description',
        product_category: "category_three",
        
      },
      {
        id: 4,
        user_id: users[3].id,
        service_name: 'Fourth test post!',
        price: 20,
        remaining_inventory: 4,
        description: 'First description',
        product_category: "category_four",
        
      },
    ]
  }

  function makeExpectedProduct(testUsers, product) {
      const users = testUsers
      .find(user=>user.id===product.user_id)
    return {
      description: product.description,
      id: product.id,
      price: product.price,
      product_category: product.category,
      remaining_inventory: product.remaining_inventory,
      service_name: product.service_name,
      user_id: users.id 
    }
  }
  

function makeProductsFixtures() {
    const testUsers = makeUsersArray()
    const testProducts = makeProductsArray(testUsers)
    return { testUsers, testProducts}
  }

  function cleanTables(db) {
    return db.transaction(trx =>
      trx.raw(
        `TRUNCATE
          holistic_users,
          holistic_users_inventory
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE holistic_users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE holistic_users_inventory_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('holistic_users_id_seq', 0)`),
          trx.raw(`SELECT setval('holistic_users_inventory_id_seq', 0)`),
        ])
      )
    )
  }

  function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, 
        secret, {
            subject: user.user_name,
            algorithm: 'HS256',
    })
    return `Bearer ${token}`
  }

  module.exports = {
    makeUsersArray,
    makeProductsArray,  
    makeProductsFixtures,
    makeExpectedProduct,
    cleanTables,
    makeAuthHeader,
  }