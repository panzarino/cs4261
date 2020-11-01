require('../lib/mongoose-setup')
const mongoose = require('mongoose')
const Section = mongoose.model('Section')
const Course = mongoose.model('Course')
const CourseSelection = mongoose.model('CourseSelection')

const data = require('./courses.json')

const periods = data.caches.periods

const main = async () => {
  await Section.remove({})
  await Course.remove({})
  await CourseSelection.remove({})

  for (const name in data.courses) {
    const courseData = data.courses[name]
    const sectionData = courseData[1]

    const course = new Course({
      name,
      fullName: courseData[0],
      sections: [],
    })

    await course.save()

    const sections = []

    for (const sect of Object.keys(sectionData)) {
      const secData = sectionData[sect]

      try {
        const section = new Section({
          course: course._id,
          crn: secData[0],
          name: sect,
          period: periods[secData[1][0][0]],
          days: secData[1][0][1],
          location: secData[1][0][2],
          instructors: secData[1][0][3],
          credits: secData[2],
        })

        await section.save()

        sections.push(section._id)
      } catch (e) {}
    }

    course.sections = sections

    await course.save()
  }

  process.exit(0)
}

main()
