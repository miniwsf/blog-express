
import Admin from "../controller/Admin";

let express = require("express");
let router = express.Router();

router.get("/", function(req, res, next) {
    res.render("login", {layout:null});
});
router.post("/loginCheck",Admin.login);

module.exports = router;