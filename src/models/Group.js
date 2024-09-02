const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Group.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Group.belongsToMany(User, { through: 'UserGroups', as: 'members' });
User.belongsToMany(Group, { through: 'UserGroups' });

module.exports = Group;