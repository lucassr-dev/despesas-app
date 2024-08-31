const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Group = sequelize.define('Group', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Group.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Group.belongsToMany(User, { through: 'UserGroup', as: 'members' });
User.belongsToMany(Group, { through: 'UserGroup', as: 'groups' });

module.exports = Group;