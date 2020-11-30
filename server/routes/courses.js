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
    return res.json(courseSelection)
  }

  const newCourseSelection = new CourseSelection({
    user: user._id,
    selections: [],
  })

  await newCourseSelection.save()

  return res.json(newCourseSelection)
})

router.post('/selections/add', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })

  courseSelection.selections.push(req.body.course)
  courseSelection.favorite = null

  await courseSelection.save()

  return res.json(courseSelection)
})

router.delete('/selections/delete/:id', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })

  courseSelection.selections.splice(req.params.id, 1)
  courseSelection.favorite = null

  await courseSelection.save()

  return res.json(courseSelection)
})

router.post('/selections/favorite/set', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })

  courseSelection.favorite = req.body.favorite

  await courseSelection.save()

  return res.json(courseSelection)
})

module.exports = router
