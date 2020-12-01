const {Router} = require('express');

const router = Router();

router.use('/' , require('./kidregister'));
router.use('/' , require('./teacherregister'));
router.use('/' , require('./foodlist'));
router.use('/' , require('./ocassion'))
module.exports = router;
