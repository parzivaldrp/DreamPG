import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18, // Optional validation for minimum age
  },

});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
