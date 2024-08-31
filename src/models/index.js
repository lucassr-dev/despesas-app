const User = require('./User');
const Group = require('./Group');
const Expense = require('./Expense');

Group.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Group.belongsToMany(User, { through: 'UserGroups', as: 'members' });
User.belongsToMany(Group, { through: 'UserGroups' });
User.hasMany(Group, { as: 'createdGroups', foreignKey: 'creatorId' });

Expense.belongsTo(Group);
Expense.belongsTo(User, { as: 'paidBy' });
Group.hasMany(Expense);
User.hasMany(Expense, { as: 'paidExpenses', foreignKey: 'paidById' });

Expense.belongsToMany(User, { through: 'ExpenseParticipants', as: 'participants' });
User.belongsToMany(Expense, { through: 'ExpenseParticipants', as: 'participatedExpenses' });

module.exports = {
  User,
  Group,
  Expense
};