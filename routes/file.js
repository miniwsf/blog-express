
import Qiniu from '../controller/Qiniu'
var express = require('express');
var router = express.Router();

router.get('/', Qiniu.getFile);
router.get('/token', Qiniu.getToken);
router.post('/saveFile', Qiniu.saveFileInfo);

module.exports = router;