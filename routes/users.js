const router = require('express').Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/:userId', findUserById);
router.post('/', createUser);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
