const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  yearName: {
    type: String,
    required: true,
  },
  monthName: {
    type: String,
    required: [true, "Please enter your month"],
  },
  data: [
    {
      expenseType: {
        type: String,
      },
      amount: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Data", dataSchema);
