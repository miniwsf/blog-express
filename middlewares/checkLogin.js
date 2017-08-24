var app = express();
var router = express.Router();

/*检查登录信息*/
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
//  next();
});

/**/
