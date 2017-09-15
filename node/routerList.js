var router = require('./router');
router.addRoute('/login', require('./routers/login'));
router.addRoute('/reg', require('./routers/reg'));
router.addRoute('/changepwd', require('./routers/changepwd'));
router.addRoute('/productList', require('./routers/productList'));
router.addRoute('/productDetail', require('./routers/productDetail'));
router.addRoute('/addShopCar', require('./routers/shopCar').addShopCar);
router.addRoute('/getShopCar', require('./routers/shopCar').getShopCar);
router.addRoute('/delShopCar', require('./routers/shopCar').delShopCar);
router.addRoute('/updateShopCar', require('./routers/shopCar').updateShopCar);
router.addRoute('/getPerson', require('./routers/person').getPerson);
router.addRoute('/setPerson', require('./routers/person').setPerson);
router.addRoute('/setHeadImage', require('./routers/person').setHeadImage);

router.addRoute('/addOrder', require('./routers/order').addOrder);
router.addRoute('/getOrder', require('./routers/order').getOrder);
router.addRoute('/getOrderDetail', require('./routers/order').getOrderDetail);
router.addRoute('/delOrder', require('./routers/order').delOrder);

router.addRoute('/addComment', require('./routers/comment').addComment);
router.addRoute('/getComment', require('./routers/comment').getComment);

router.addRoute('/getBrowseLog', require('./routers/browselog').getBrowseLog);

router.addRoute('/getCollectionLog', require('./routers/collectionLog').getCollectionLog);
router.addRoute('/addCollectionLog', require('./routers/collectionLog').addCollectionLog);
router.addRoute('/delCollectionLog', require('./routers/collectionLog').delCollectionLog);
router.addRoute('/getIsCollection', require('./routers/collectionLog').getIsCollection);


//以下非跳蚤
router.addRoute('/index', require('./routers/index'));
router.addRoute('/shop', require('./routers/shop'));
router.addRoute('/individual', require('./routers/individual'));
module.exports=router;