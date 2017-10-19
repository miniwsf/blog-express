
import Admin from '../controller/Admin'
import CheckToken from '../middlewares/checkToken'

var express = require('express');
var router = express.Router();

router.get('/', CheckToken,Qiniu.getFile);
router.get('/token', CheckToken,Qiniu.getToken);
router.post('/saveFile',CheckToken, Qiniu.saveFileInfo);

module.exports = router;
