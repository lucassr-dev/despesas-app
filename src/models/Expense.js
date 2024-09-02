const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Group = require('./Group');

const Expense = sequelize.define('Expense', {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Expense.belongsTo(User, { as: 'paidBy', foreignKey: 'paidById' });
Expense.belongsTo(Group, { foreignKey: 'groupId' });
Expense.belongsToMany(User, { through: 'ExpenseParticipants', as: 'participants' });

Group.hasMany(Expense, { foreignKey: 'groupId' });

module.exports = Expense;