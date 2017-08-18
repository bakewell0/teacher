var router = require('./router');
router.addRoute('/login', require('./routers/login'));
router.addRoute('/reg', require('./routers/reg'));
router.addRoute('/changepwd', require('./routers/changepwd'));
router.addRoute('/productList', require('./routers/productList'));
router.addRoute('/productDetail', require('./routers/productDetail'));
router.addRoute('/addShopCar', require('./routers/shopCar').addShopCar);
router.addRoute('/getShopCar', require('./routers/shopCar').getShopCar);
router.addRoute('/delShopCar', require('./routers/shopCar').delShopCar);
router.addRoute('/getPerson', require('./routers/person').getPerson);
router.addRoute('/setPerson', require('./routers/person').setPerson);
router.addRoute('/setHeadImage', require('./routers/person').setHeadImage);

router.addRoute('/addOrder', require('./routers/order').addOrder);
router.addRoute('/getOrder', require('./routers/order').getOrder);
router.addRoute('/getOrderDetail', require('./routers/order').getOrderDetail);
router.addRoute('/delOrder', require('./routers/order').delOrder);

//以下非跳蚤
router.addRoute('/index', require('./routers/index'));
router.addRoute('/shop', require('./routers/shop'));
router.addRoute('/individual', require('./routers/individual'));
module.exports=router;