var uuid = require('node-uuid');
function RouterData(route,handler){
     this.route = route||'';
     this.handler = handler||{};
     this.id = uuid.v4();
 }
 
 function Router(){ 
     var routers = [];
     var me = this;
     
     this.addRoute = function(route, handler){
         if(!route||!handler) return;
         var routeData = new RouterData(route, handler);
         routers.push(routeData);
     };
     
     this.handleRoute = function(route, req, res){
         var handler = getRouteHandlerByRoute(route);
         if(!handler){
             return;
         }
         res.setHeader('Access-Control-Allow-Origin','*');     
         handler.exec(route, req, res);
     };
 
     function getRouteHandlerByRoute(route){
         var n = routers.length;
         var handler = null;
         for (var i = n - 1; i >= 0; i--) {
             if(routers[i].route === route){
                 handler = routers[i].handler;
                 break;
             }
        }
         return handler;
     }
 }
module.exports = new Router();