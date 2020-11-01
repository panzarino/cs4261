const mongoose = require('mongoose')
const router = require('express').Router()
const User = mongoose.model('User')
const Course = mongoose.model('Course')
const CourseSelection = mongoose.model('CourseSelection')

const auth = require('../auth/middleware')

router.get('/all', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courses = await Course.find({})

  res.json(courses)
})

router.get('/selections', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })

  if (courseSelection) {
    return res.json(courseSelection.selections)
  }

  const newCourseSelection = new CourseSelection({
    user: user._id,
    selections: [],
  })

  await newCourseSelection.save()

  return res.json(newCourseSelection.selections)
})

router.post('/selections/add', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })

  courseSelection.selections.push(req.body.course)

  await courseSelection.save()

  return res.json(courseSelection)
})

module.exports = router
