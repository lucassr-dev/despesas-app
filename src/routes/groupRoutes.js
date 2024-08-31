const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/create', groupController.createGroup);
router.get('/', groupController.getGroups);
router.post('/invite', groupController.inviteUser);

module.exports = router;