var router = require('./router');
router.addRoute('/login', require('./routers/login'));
router.addRoute('/reg', require('./routers/reg'));
router.addRoute('/changepwd', require('./routers/changepwd'));
router.addRoute('/productList', require('./routers/productList'));
router.addRoute('/productDetail', require('./routers/productDetail'));
//以下非跳蚤
router.addRoute('/index', require('./routers/index'));
router.addRoute('/shop', require('./routers/shop'));
router.addRoute('/person', require('./routers/person'));
module.exports=router;