const mongoose = require('mongoose')
const router = require('express').Router()
const passport = require('passport')
const User = mongoose.model('User')

const auth = require('../auth/middleware')

router.get('/me', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  return res.json(user.toAuthJSON())
})

router.post('/register', async function (req, res) {
  const user = new User()

  user.email = req.body.email.trim()
  user.setPassword(req.body.password)

  await user.save()

  return res.json(user.toAuthJSON())
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
