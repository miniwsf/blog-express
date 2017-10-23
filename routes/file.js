
import Qiniu from "../controller/Qiniu";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/", CheckToken,Qiniu.getFile);
router.get("/token", CheckToken,Qiniu.getToken);
router.post("/saveFile",CheckToken, Qiniu.saveFileInfo);

module.exports = router;