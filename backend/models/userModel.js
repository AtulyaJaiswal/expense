const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name should be less than 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  expenseData: [
    {
      fileName: {
        type: String,
        required: [true, "Please enter your month"],
      },
      data: [
        {
          date: {
            type: String,
          },
          expenseType: {
            type: String,
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  ],
});

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);
