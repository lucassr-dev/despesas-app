const User = require('./User');
const Group = require('./Group');

Group.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });
Group.belongsToMany(User, { through: 'UserGroups', as: 'members' });
User.belongsToMany(Group, { through: 'UserGroups' });
User.hasMany(Group, { as: 'createdGroups', foreignKey: 'creatorId' });

module.exports = {
  User,
  Group
};