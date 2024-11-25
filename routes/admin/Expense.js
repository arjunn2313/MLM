const {
  createExpense,
  getSingleExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  createManyExpenses,
  getUniqueCategories,
} = require("../../controllers/Admin/Expense");

const router = require("express").Router();

// CREATE
router.post("/create", createExpense);
// CREATE MANY
router.post("/create-many", createManyExpenses);
// GET UNIQUE CATEGORY
router.get("/category", getUniqueCategories);
// GET SINGLE
router.get("/get-single/:id", getSingleExpense);
// GET ALL
router.get("/getAll", getAllExpenses);
// UPDATE
router.put("/update/:id", updateExpense);
// DELETE
router.delete("/delete/:id", deleteExpense);

module.exports = router;
