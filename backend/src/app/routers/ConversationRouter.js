const Conversation = require('../controllers/Conversation');
const router = require('express').Router();

router.post('/', Conversation.CreateConversation);
router.get('/:userId', Conversation.getConversation);
module.exports = router;