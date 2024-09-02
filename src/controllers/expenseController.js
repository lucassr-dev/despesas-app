const Expense = require('../models/Expense');
const Group = require('../models/Group');
const User = require('../models/User');

exports.createExpense = async (req, res) => {
  try {
    const { description, amount, groupId, participantIds } = req.body;
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }
    const expense = await Expense.create({
      description,
      amount,
      groupId,
      paidById: req.user.id,
    });
    await expense.setParticipants(participantIds);
    res.status(201).json({ message: 'Despesa criada com sucesso', expenseId: expense.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { description, amount, participantIds } = req.body;
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    if (expense.paidById !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para editar esta despesa' });
    }
    await expense.update({ description, amount });
    await expense.setParticipants(participantIds);
    res.json({ message: 'Despesa atualizada com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.expenseId);
    if (!expense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    if (expense.paidById !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta despesa' });
    }
    await expense.destroy();
    res.json({ message: 'Despesa excluída com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { groupId: req.params.groupId },
      include: [
        { model: User, as: 'paidBy', attributes: ['id', 'name'] },
        { model: User, as: 'participants', attributes: ['id', 'name'] },
      ],
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.calculateBalances = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        { model: User, as: 'members' },
        { 
          model: Expense,
          include: [
            { model: User, as: 'paidBy' },
            { model: User, as: 'participants' }
          ]
        }
      ]
    });

    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }

    const balances = {};
    group.members.forEach(member => {
      balances[member.id] = 0;
    });

    group.Expenses.forEach(expense => {
      const paidBy = expense.paidBy.id;
      const amount = parseFloat(expense.amount);
      const participantsCount = expense.participants.length;
      const shareAmount = amount / participantsCount;

      balances[paidBy] += amount;
      expense.participants.forEach(participant => {
        balances[participant.id] -= shareAmount;
      });
    });

    const formattedBalances = Object.entries(balances).map(([userId, balance]) => ({
      userId,
      balance: parseFloat(balance.toFixed(2)),
    }));

    res.json(formattedBalances);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};