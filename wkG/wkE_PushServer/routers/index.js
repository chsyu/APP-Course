var express = require('express'),
    index   = require('../controllers/index'),
    push    = require('../controllers/push'),
    router  = express.Router();

router.route('/')
  .get(index);
router.route('/tokens')
  .post(push);
module.exports = router;
