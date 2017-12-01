
import Article from "../controller/Article";

let express = require("express");
let router = express.Router();

router.get("/", Article.getHome);
router.get("/blog", Article.getBlog);
router.post("/blog", Article.getBlogMore);
router.get("/blog/:articleId", Article.getBlogDetail);
router.get("/aboutMe", function(req, res, next) {
    res.render("aboutMe", {layout:"index"});
});
/*router.get("/demo", function(req, res, next) {
    res.render("demo", {layout:"index"});
});*/
router.put("/blog/:articleId", Article.praiseBlog);

module.exports = router;