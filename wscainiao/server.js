var restify = require('restify');
//添加路由表
var router = require("./routerList.js");
function onListened(){
  console.log('Node server starts at 8888.');
}
function onConnected(req, res){
  router.handleRoute(req.url, req, res);
}
var server = restify.createServer();
//server.use(restify.queryParser());
server.use(restify.plugins.bodyParser());
server.post('/:name', onConnected);
server.listen(8888, onListened);