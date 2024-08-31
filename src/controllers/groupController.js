const { Group, User } = require('../models');

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({
      name,
      description,
      creatorId: req.user.id,
    });
    await group.addMember(req.user.id);
    res.status(201).json({ message: 'Grupo criado com sucesso', group });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      include: [
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] },
        },
      ],
      where: {
        '$members.id$': req.user.id,
      },
    });
    res.json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.inviteUser = async (req, res) => {
  try {
    const { groupId, email } = req.body;
    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Grupo não encontrado' });
    }
    if (group.creatorId !== req.user.id) {
      return res.status(403).json({ message: 'Apenas o criador do grupo pode convidar usuários' });
    }
    const userToInvite = await User.findOne({ where: { email } });
    if (!userToInvite) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await group.addMember(userToInvite.id);
    res.json({ message: 'Usuário convidado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};