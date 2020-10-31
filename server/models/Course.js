const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    sections: [{ type: Schema.Types.ObjectId, ref: 'Section', required: true }],
  },
  { timestamps: true }
)

mongoose.model('Course', CourseSchema)
