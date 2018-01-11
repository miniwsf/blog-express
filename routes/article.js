
import Article from "../controller/Article";
import CheckToken from "../middlewares/checkToken";

let express = require("express");
let router = express.Router();

router.get("/",CheckToken,function(req, res) {
    res.render("article/article");
});
router.delete("/",CheckToken,Article.deleteArticle);
router.put("/",CheckToken,Article.updateArticle);
router.post("/",CheckToken,Article.updateAndSave);
router.get("/articleAdd",CheckToken,Article.getArticleDataById);

module.exports = router;
