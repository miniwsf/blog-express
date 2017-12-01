
import Admin from "../controller/Admin";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/", CheckToken,Admin.getPersonal);
router.post("/", CheckToken,Admin.saveData);

module.exports = router;
