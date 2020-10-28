const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

app.use(cors())

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI + '/' + process.env.MONGODB_DB)
mongoose.set('debug', !isProduction)

require('./models/User')

require('./auth/passport')

if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500)

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    })
  })
}

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  })
})

const server = app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + server.address().port)
})

app.use(require('./routes'))
