const mongoose = require('mongoose')

require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production'

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI + '/' + process.env.MONGODB_DB)
mongoose.set('debug', !isProduction)

require('../models/User')
require('../models/Section')
require('../models/Course')
