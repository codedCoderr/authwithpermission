const mongoose = require('mongoose');
const { Schema } = mongoose;
var UserSchema = new Schema({
  username: { type: String },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: { type: String, required: true },
  permissions: { type: Array, default: [] },
});

var User = mongoose.model('User', UserSchema);
exports.User = User;
