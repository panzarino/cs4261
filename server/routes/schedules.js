const mongoose = require('mongoose')
const router = require('express').Router()
const moment = require('moment')
const User = mongoose.model('User')
const Course = mongoose.model('Course')
const CourseSelection = mongoose.model('CourseSelection')

const auth = require('../auth/middleware')

const scheduleIsValid = (schedule) => {
  const validDays = ['M', 'T', 'W', 'R', 'F']

  for (let i = 0; i < schedule.length; i++) {
    const section1 = schedule[i]
    const period1 = section1.period
    const days1 = section1.days.split('')

    if (period1 === 'TBA') return false

    const [start1, end1] = period1.split(' - ').map((t) => moment(t, 'h:mm a'))

    for (let j = i + 1; j < schedule.length; j++) {
      const section2 = schedule[j]
      const period2 = section2.period
      const days2 = section2.days.split('')

      if (period2 === 'TBA') return false

      const [start2, end2] = period2.split(' - ').map((t) => moment(t, 'h:mm a'))

      if (days1.some((day) => !validDays.includes(day))) return false

      if (days1.some((day) => days2.includes(day))) {
        if (start1.isSameOrBefore(end2) && end1.isSameOrAfter(start2)) {
          return false
        }
      }
    }
  }

  return true
}

const updateIndex = (indexes, maxIndexes, i) => {
  if (i < 0) {
    return false
  }

  indexes[i]++

  if (indexes[i] >= maxIndexes[i]) {
    indexes[i] = 0
    return updateIndex(indexes, maxIndexes, i - 1)
  }

  return true
}

router.get('/all', auth.required, async function (req, res) {
  const user = await User.findById(req.payload.id)

  if (!user) return res.sendStatus(401)

  const courseSelection = await CourseSelection.findOne({ user: user._id })
    .populate({
      path: 'selections',
      populate: {
        path: 'sections',
      },
    })
    .lean()

  const { selections } = courseSelection

  if (!selections.length) {
    return res.json([])
  }

  const schedules = []

  const maxIndexes = selections.map((c) => c.sections.length)
  const indexes = Array(maxIndexes.length).fill(0)

  let run = true

  while (run) {
    const schedule = indexes.map((index, i) => {
      const course = selections[i]
      const section = course.sections[index]

      return {
        ...section,
        name: course.name,
        fullName: course.fullName,
        sectionName: section.name,
      }
    })

    if (scheduleIsValid(schedule)) {
      schedules.push(schedule)
    }

    run = updateIndex(indexes, maxIndexes, indexes.length - 1)
  }

  return res.json(schedules)
})

module.exports = router
