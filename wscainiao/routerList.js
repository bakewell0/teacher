var router = require('./router');

router.addRoute('/addUser', require('./routers/user'));


module.exports=router;