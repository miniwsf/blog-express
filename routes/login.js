
import Admin from "../controller/Admin";

let express = require("express");
let router = express.Router();

router.get("/", function(req, res, next) {
    res.render("login/login", {layout:null});
});
router.post("/",Admin.login);

module.exports = router;