const router = require('express').Router();
const {
  findUsers,
  findUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', findUsers);
router.get('/me', getUserInfo);

router.get('/:userId', findUserById);

router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
