
import Admin from '../controller/Admin'
import CheckToken from '../middlewares/checkToken'

var express = require('express');
var router = express.Router();

router.get('/', CheckToken,Admin.getPersonal);
router.post('/saveData', CheckToken,Admin.saveData);

module.exports = router;
