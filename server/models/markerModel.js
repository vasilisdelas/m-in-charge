const mongoose = require('mongoose')

const MarkerSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
      min: 3,
      max: 40,
    },
    desc: {
      type: String,
      required: true,
      min: 5,
    },
    power: {
      type: Number,
      required: true,
      min: 10,
      max: 250,
    },
    lon: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Marker', MarkerSchema)