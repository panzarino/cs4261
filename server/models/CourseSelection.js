const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSelectionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectID, ref: 'User', required: true },
    selections: [{ type: Schema.Types.ObjectID, ref: 'Course', required: true }],
  },
  { timestamps: true }
)

mongoose.model('CourseSelection', CourseSelectionSchema)
