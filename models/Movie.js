const mongoose = require('mongoose');
const { Schema } = mongoose;
var MovieSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
    required: true,
  },
  rating: { type: String, required: true },
  yearOfRelease: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

var Movie = mongoose.model('Movie', MovieSchema);
exports.Movie = Movie;
