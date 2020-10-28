const mongoose = require('mongoose')
const router = require('express').Router()
const passport = require('passport')
const User = mongoose.model('User')

const auth = require('../auth/middleware')

router.get('/me', auth.required, function (req, res, next) {
  User.findById(req.payload.id)
    .then(function (user) {
      if (!user) {
        return res.sendStatus(401)
      }

      return res.json(user.toAuthJSON())
    })
    .catch(next)
})

router.post('/register', function (req, res) {
  const user = new User()

  user.email = req.body.email.trim()
  user.setPassword(req.body.password)

  user.save(function (err) {
    if (err) {
      return res.json({ error: err.message })
    }

    return res.json(user.toAuthJSON())
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, function (err, user, info) {
    if (err) {
      return next(err)
    }

    return res.json(user.toAuthJSON())
  })(req, res, next)
})

module.exports = router
