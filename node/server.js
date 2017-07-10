var restify = require('restify');
var router = require('./router');
router.addRoute('/login', require('./routers/login'));
router.addRoute('/reg', require('./routers/reg'));
router.addRoute('/changepwd', require('./routers/changepwd'));
//以下非跳蚤
router.addRoute('/index', require('./routers/index'));
router.addRoute('/shop', require('./routers/shop'));
router.addRoute('/person', require('./routers/person'));
function onListened(){
  console.log('Node server starts at 3900.');
}
function onConnected(req, res){
  router.handleRoute(req.url, req, res);
}
var server = restify.createServer();
server.use(restify.bodyParser());
server.post('/:name', onConnected);
server.listen(3900, onListened);