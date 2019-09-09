const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Products Endpoint', function(){
    let db 

    const {
        testUsers,
        testProducts,
    } = helpers.makeProductsFixtures()

    before('make knex instance', ()=>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', ()=> db.destroy())

    before('cleanup', ()=>helpers.cleanTables(db))

    afterEach('cleanup',()=> helpers.cleanTables(db))

    describe(`GET /api/products`, () => {
        context(`Given no products`, () => {
          it(`responds with 200 and an empty list`, () => {
            return supertest(app)
              .get('/api/products')
              .expect(200, [])
          })
        })

    context('Given there are products in the database', ()=>
        beforeEach('insert products', ()=>
            helpers.seedProductsTables(
        db,
        testUsers,
        testProducts
            )
        )
    )
    it('responds with 200 and all the products', ()=> {
        const expectedProducts = testProducts.map(product =>
            helpers.makeExpectedProduct(
                testUsers,
                product,
            )
        )
        return supertest(app)
                .get('/api/products')
                .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
                .expect(200, expectedProducts)
    })
})
})