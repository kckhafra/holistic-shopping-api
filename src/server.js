const app = require('./app')
const knex = require('knex')
const { PORT, DB_URL } = require('./config')
const stripe = require("stripe")("sk_test_vs3Mz6PI4jkeweP8gvTIWyna00rDmeY6nW");

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

