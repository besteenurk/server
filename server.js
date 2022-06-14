const express = require('express')
const models = require('./model')

const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schema = require('./schema/schema')
const app = express()
const cors = require('cors')

const MONGO_URI = 'mongodb+srv://beste:beste@cluster0.637sk.mongodb.net/?retryWrites=true&w=majority'
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error))

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('listening..')
})
