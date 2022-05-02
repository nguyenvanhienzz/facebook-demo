const router = require('express').Router();
const Messager = require('../controllers/Messager');

router.post('/', Messager.postMessager);
router.get('/:coversationId', Messager.getMessager);
module.exports = router;