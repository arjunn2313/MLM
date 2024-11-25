const mongoose = require("mongoose");

const expenseChema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    spentFor: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["paid", "un paid"],
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseChema);

module.exports = Expense;
