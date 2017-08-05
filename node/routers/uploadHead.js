function UploadHead(){
	this.exec = function(route, req, res){   
		upload(req,res);  
	}
}

function upload(req,res){
	var fs=require("fs");
	fs.createReadStream(req.files.file.path)
	.pipe(fs.createWriteStream('./img/upload/'+req.files.file.name));
}

module.exports=new UploadHead();




