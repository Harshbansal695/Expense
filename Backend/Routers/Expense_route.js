const express = require("express");
const {
  addExpense,
  getAllExpenses,
  removeExpense,
  updateExpense,
  markAsDoneOrUndone,
} = require("../Controllers/expense_controller");
const isAuthenticated = require("../middleware/isAuthenticate");

const router = express.Router();

router.route("/add").post(isAuthenticated, addExpense);
router.route("/getall").get(isAuthenticated, getAllExpenses);
router.route("/remove/:id").delete(isAuthenticated, removeExpense);
router.route("/update/:id").put(isAuthenticated, updateExpense);
router.route("/:id/done").put(isAuthenticated, markAsDoneOrUndone);

module.exports = router;
