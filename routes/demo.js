
import Demo from "../controller/Demo";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/",CheckToken,function (req, res) {
    res.render("demo/demo", {layout:"layout"});
});
router.post("/demoData",Demo.getDemoMore);
router.delete("/",CheckToken,Demo.deleteDemo);
router.put("/",CheckToken,Demo.updateDemo);
router.post("/",CheckToken,Demo.updateAndSave);

module.exports = router;
