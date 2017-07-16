var restify = require('restify');
//添加路由表
var router = require("./routerList.js");
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