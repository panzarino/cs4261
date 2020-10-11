const firebase = require('./firebase')

const db = firebase.database().ref('courses')

const data = require('./courses.json')

const periods = data.caches.periods

const main = async () => {
  for (let course of Object.keys(data.courses)) {
    const courseData = data.courses[course]
    const sectionData = courseData[1]

    const sections = {}

    for (let section of Object.keys(sectionData)) {
      const secData = sectionData[section]
      try {
        sections[secData[0]] = {
          name: section,
          crn: secData[0],
          period: periods[secData[1][0][0]],
          days: secData[1][0][1],
          location: secData[1][0][2],
          instructors: secData[1][0][3],
          credits: secData[2],
        }
      } catch (e) {}
    }

    await db.push({
      name: course,
      fullName: courseData[0],
      sections,
    })
  }

  firebase.app().delete()
}

main()
