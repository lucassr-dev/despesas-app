const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware);

router.post('/', groupController.createGroup);
router.put('/:groupId', groupController.updateGroup);
router.delete('/:groupId', groupController.deleteGroup);
router.get('/', groupController.getGroups);
router.get('/:groupId', groupController.getGroupDetails);
router.post('/:groupId/invite', groupController.inviteToGroup);

module.exports = router;