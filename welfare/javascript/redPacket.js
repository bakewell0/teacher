//获取用户列表
$.ajax({
	type: "post",
	url: "http://res.wscainiao.com:443/getListPacket",
	contentType: "application/json",
	async: true,
	data: JSON.stringify({
		userid: getQuerystring("userid")
	}),
	success: function(result) {
		var data = result.result;
		renderList(data);
	}
});

function renderList(data) {
	var list = "",
		user = data.user,
		redpackets = data.redpackets,
		totalmoney = user.totalmoney ? user.totalmoney : 0,
		totalnum = user.totalnum ? user.totalnum : 0;

	for(var i = redpackets.length - 1; i >= 0; i--) {
		list += '<li class="cf">' +
			'<a href = "#" >' +
			'<span class = "lf" >' + (i+1) + '</span>' +
			'<img src = ' + redpackets[i].headimage + ' class = "t2 lf" / >' +
			'<div class = "cf lf friend_name" >' +
			'<em class = "lf" >' + redpackets[i].nickname + ' </em>' +
			'<i class="rf">' + redpackets[i].money + '元</i >' +
			'</div></a></li>';
	}

	$(".photo").attr("src", user.headimage);
	$(".userName").html(user.name);
	$(".amount").html(totalmoney);
	$(".visitorNum").html(totalnum);
	$(".friend2").append(list);
}