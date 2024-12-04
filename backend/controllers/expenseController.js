const Expense = require('../models/Expense');
const logger = require('../utils/logger');

// get all expence
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    logger.error(`Fetch Expenses Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// add new expense
exports.addExpense = async (req, res) => {
  const { amount, category, description } = req.body;

  try {
    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      description,
    });

    logger.info(`Expense Added: ${expense._id}`);
    res.status(201).json(expense);
  } catch (error) {
    logger.error(`Add Expense Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update 
exports.updateExpense = async (req, res) => {
  const { amount, category, description } = req.body;

  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = description || expense.description;

    const updatedExpense = await expense.save();
    logger.info(`Expense Updated: ${expense._id}`);
    res.status(200).json(updatedExpense);
  } catch (error) {
    logger.error(`Update Expense Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense || expense.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.remove();
    logger.info(`Expense Deleted: ${expense._id}`);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    logger.error(`Delete Expense Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};
