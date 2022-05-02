const router = require('express').Router();
const Notification = require('../controllers/Notification');
router.get('/:receiverId', Notification.getNotification);
router.post('/', Notification.postNotification);
router.put('/:receiverId', Notification.setNotification);
module.exports = router;