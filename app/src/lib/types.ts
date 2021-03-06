export interface Section {
  _id: string
  credits: number
  crn: string
  days: string
  instructors: string[]
  location: string
  name: string
  period: string
}

export interface Course {
  _id: string
  name: string
  fullName: string
  sections: string[] | Section[]
}

export interface ScheduleSection extends Section {
  sectionName: string
  fullName: string
}
