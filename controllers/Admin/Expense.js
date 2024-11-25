const Expense = require("../../models/Expense");

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const {
      category,
      subCategory,
      amount,
      spentFor,
      description,
      status,
      date,
    } = req.body;

    if (!category || !subCategory || !amount || !spentFor || !status) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newExpense = new Expense({
      date,
      category,
      subCategory,
      amount,
      spentFor,
      description,
      status,
    });

    await newExpense.save();

    return res.status(201).json({
      message: "Expense created successfully",
      expense: newExpense,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating expense", error: error.message });
  }
};

// Get a single expense by ID
const getSingleExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({ expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching expense", error: error.message });
  }
};

// GET ALL EXPENSE
const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to, category, search } = req.query;

    let filter = {};

    // Date filtering
    if (from && to) {
      filter.createdAt = {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
        $lte: new Date(new Date(to).setHours(23, 59, 59)),
      };
    } else if (from) {
      filter.createdAt = {
        $gte: new Date(new Date(from).setHours(0, 0, 0)),
      };
    } else if (to) {
      filter.createdAt = { $lte: new Date(new Date(to).setHours(23, 59, 59)) };
    }

    // Category filtering
    if (category) {
      filter.category = category;
    }

    // Search filtering
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: "i" } },
        { spentFor: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Aggregation to get expenses with sum calculations
    const expensesAggregate = await Expense.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalPaid: {
            $sum: { $cond: [{ $eq: ["$status", "paid"] }, "$amount", 0] },
          },
          totalUnpaid: {
            $sum: { $cond: [{ $eq: ["$status", "un paid"] }, "$amount", 0] },
          },
        },
      },
    ]);

    const sums = expensesAggregate.length > 0 ? expensesAggregate[0] : {};

    // Get paginated expenses
    const expenses = await Expense.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalExpenses = await Expense.countDocuments(filter);

    return res.status(200).json({
      total: totalExpenses,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalExpenses / limit),
      sums: {
        totalAmount: sums.totalAmount || 0,
        totalPaid: sums.totalPaid || 0,
        totalUnpaid: sums.totalUnpaid || 0,
      },
      expenses,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};

// UPDATE
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, subCategory, amount, spentFor, description, status } =
      req.body;

    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (category) expense.category = category;
    if (subCategory) expense.subCategory = subCategory;
    if (amount) expense.amount = amount;
    if (spentFor) expense.spentFor = spentFor;
    if (description) expense.description = description;
    if (status) expense.status = status;

    const updatedExpense = await expense.save();

    return res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating expense", error: error.message });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

// CREATE MANY
const createManyExpenses = async (req, res) => {
  const expenses = req.body; // Expecting an array of expense objects in the request body

  // Validate the input data
  if (!Array.isArray(expenses) || expenses.length === 0) {
    return res.status(400).json({
      message: "Invalid input, please provide an array of expenses.",
    });
  }

  try {
    const result = await Expense.insertMany(expenses);
    return res.status(201).json({
      message: "Expenses created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating expenses",
      error: error.message,
    });
  }
};

// GET CATEGORY

const getUniqueCategories = async (req, res) => {
  try {
    const categories = await Expense.distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve categories", error });
  }
};

module.exports = {
  createExpense,
  getSingleExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  createManyExpenses,
  getUniqueCategories,
};
