const Group = require('../models/Group');
const User = require('../models/User');

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({ 
      name, 
      description, 
      creatorId: req.user.id 
    });
    await group.addMember(req.user.id);
    res.status(201).json({ message: 'Grupo criado com sucesso', groupId: group.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }
    if (group.creatorId !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este grupo' });
    }
    await group.update({ name, description });
    res.json({ message: 'Grupo atualizado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }
    if (group.creatorId !== req.user.id) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir este grupo' });
    }
    await group.destroy();
    res.json({ message: 'Grupo excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGroups = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const groups = await user.getGroups();
    res.json(groups);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email'] },
        { model: User, as: 'creator', attributes: ['id', 'name', 'email'] }
      ]
    });
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }
    res.json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.inviteToGroup = async (req, res) => {
  try {
    const { email } = req.body;
    const group = await Group.findByPk(req.params.groupId);
    if (!group) {
      return res.status(404).json({ error: 'Grupo não encontrado' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    const isMember = await group.hasMember(user);
    if (isMember) {
      return res.status(400).json({ error: 'Usuário já é membro deste grupo' });
    }
    await group.addMember(user);
    res.json({ message: 'Usuário convidado com sucesso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};