
import Admin from "../controller/Admin";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/personal", CheckToken,Admin.getPersonal);
router.get("/", CheckToken,function(req, res) {
    res.render("user/user");
});
router.post("/", CheckToken,Admin.saveData);

module.exports = router;
