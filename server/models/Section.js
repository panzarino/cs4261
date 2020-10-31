const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SectionSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectID, ref: 'Course', required: true, index: true },
    crn: { type: String, required: true, index: true },
    name: { type: String, required: true },
    period: { type: String, required: true },
    days: [{ type: String, required: true }],
    location: { type: String, required: true },
    instructors: [{ type: String, required: true }],
    credits: { type: Number, required: true },
  },
  { timestamps: true }
)

mongoose.model('Section', SectionSchema)
