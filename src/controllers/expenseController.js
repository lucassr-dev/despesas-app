const { Expense, Group, User } = require('../models');

exports.createExpense = async (req, res) => {
  try {
    const { groupId, description, amount, participantIds } = req.body;
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }

    const expense = await Expense.create({
      description,
      amount,
      GroupId: groupId,
      paidById: req.user.id,
    });

    await expense.setParticipants(participantIds);

    res.status(201).json({ message: 'Despesa criada com sucesso', expense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGroupExpenses = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.findAll({
      where: { GroupId: groupId },
      include: [
        { model: User, as: 'paidBy', attributes: ['id', 'name'] },
        { model: User, as: 'participants', attributes: ['id', 'name'], through: { attributes: [] } },
      ],
    });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.calculateBalances = async (req, res) => {
  try {
    const { groupId } = req.params;
    const expenses = await Expense.findAll({
      where: { GroupId: groupId },
      include: [
        { model: User, as: 'paidBy', attributes: ['id', 'name'] },
        { model: User, as: 'participants', attributes: ['id', 'name'], through: { attributes: [] } },
      ],
    });

    const balances = {};
    expenses.forEach(expense => {
      const paidBy = expense.paidBy.id;
      const amount = parseFloat(expense.amount);
      const participantsCount = expense.participants.length;
      const sharePerPerson = amount / participantsCount;

      expense.participants.forEach(participant => {
        const participantId = participant.id;
        if (!balances[participantId]) balances[participantId] = 0;
        if (!balances[paidBy]) balances[paidBy] = 0;

        if (participantId !== paidBy) {
          balances[participantId] -= sharePerPerson;
          balances[paidBy] += sharePerPerson;
        }
      });
    });

    const formattedBalances = Object.entries(balances).map(([userId, balance]) => ({
      userId,
      balance: parseFloat(balance.toFixed(2)),
    }));

    res.json(formattedBalances);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};