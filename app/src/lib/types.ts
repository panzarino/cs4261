export interface Section {
  credits: number
  crn: string
  days: string
  instructors: string[]
  location: string
  name: string
  period: string
}

export interface Course {
  name: string
  fullName: string
  sections: { [crn: string]: Section }
}
