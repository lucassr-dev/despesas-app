const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', expenseController.createExpense);
router.put('/:expenseId', expenseController.updateExpense);
router.delete('/:expenseId', expenseController.deleteExpense);
router.get('/group/:groupId', expenseController.getGroupExpenses);
router.get('/group/:groupId/balances', expenseController.calculateBalances);

module.exports = router;