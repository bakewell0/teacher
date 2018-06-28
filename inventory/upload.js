function upload(source,dest){
	var fs=require("fs");
	fs.createReadStream(source)
	.pipe(fs.createWriteStream(dest));
}

module.exports={
	upload:upload
};