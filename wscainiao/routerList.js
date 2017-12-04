var router = require('./router');

router.addRoute('/addUser', require('./routers/user').addUser);
router.addRoute('/getUser', require('./routers/user').getUser);
router.addRoute('/delUser', require('./routers/user').delUser);
router.addRoute('/checkPhone', require('./routers/user').checkPhone);
router.addRoute('/getResult', require('./routers/result'));

module.exports=router;