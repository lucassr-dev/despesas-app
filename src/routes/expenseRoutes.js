const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/create', expenseController.createExpense);
router.get('/group/:groupId', expenseController.getGroupExpenses);
router.get('/group/:groupId/balances', expenseController.calculateBalances);

module.exports = router;