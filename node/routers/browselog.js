const browselog = require("../model.js").browselog;
const getUserId = require("../token.js").getUserId;

function GetBrowseLog(){
	this.exec = function(route, req, res){		
	    get(req,res);
	}
}

async function get(req,res){
	if(!req.body.token) {
		res.send({ isSuccess: false, result: '登录信息不能为空' })
		return;
	}
	
	var browselogs = await browselog.findAll({
		where: {
			userId: getUserId(req.body.token)
		}
	})
	
//	for(var i = 0; i < browselogs.length; i++) {
//		var productIds = [];
//		var browses = [];
//		if (browselogs[i].updatedAt) {
//			browses.push(browselogs[i]);
//		}else {
//			
//		}
//	}
	
	res.send({ isSuccess: true, result: browselogs})
}


module.exports={
	getBrowseLog:new GetBrowseLog(),
}