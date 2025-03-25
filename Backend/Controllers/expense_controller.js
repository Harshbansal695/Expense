const Expense = require("../Models/expense_model");

const addExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const userId = req.id;
    if (!description || !amount || !category) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    const expense = await Expense.create({
      description,
      amount: Number(amount),
      category,
      userId,
    });
    return res.status(201).json({
      message: "New Expense Added.",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const userId = req.id;
    let category = req.query.category || "";
    const done = req.query.done || "";

    const query = { userId };

    if (category.toLowerCase() !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }

    const expenses = await Expense.find(query);

    if (!expenses || expenses.length === 0) {
      return res.status(404).json({
        message: "No expenses found.",
        success: false,
      });
    }

    return res.status(200).json({
      expenses,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const markAsDoneOrUndone = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const { done } = req.body; // Extract done status
    const expense = await Expense.findByIdAndUpdate(
      expenseId,
      { done },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: `Expense marked as ${done ? "done" : "undone"}.`,
      success: true,
      expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const removeExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);
    return res.status(200).json({
      message: "Expense removed.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expenseId = req.params.id;
    const updateData = { description, amount, category };

    const expense = await Expense.findByIdAndUpdate(expenseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      message: "Expense Updated.",
      expense,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
  markAsDoneOrUndone,
  removeExpense,
  updateExpense,
};
