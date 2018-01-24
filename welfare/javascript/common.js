$(document).ready(function() {
	$("#rob").click(function() {
		$(".red").fadeIn();
		$(".tckdy_nr_two").fadeIn();
	});
	$("#open").click(function() {
		$(".tckdy_nr_two").fadeOut();
		$(".tckdy_nr").fadeIn();
		robRedPacket();
	});
	$(".red").click(function() {
		$(".red").fadeOut();
		$(".tckdy_nr_two").fadeOut();
		$(".tckdy_nr").fadeOut();
	});
});

$(document).on("click", ".share", function() {
	wx.onMenuShareTimeline({
		title: '长沙菜鸟基地产品',
		link: link,
		imgUrl: 'http://res.wscainiao.com/welfare/img/p2166127561.jpg',
		trigger: function(res) {

		},
		success: function(res) {

		},
		cancel: function(res) {

		},
		fail: function(res) {
			alert(JSON.stringify(res));
		}
	});
})

$(document).on("click", ".lookup", function() {
	location.href = "redPacket.html?userid=" + getQuerystring('userid')
})

//抢到当前红包金额
function robRedPacket() {
	//取localstorage的值
	var visitor = JSON.parse(localStorage.getItem("visitor"));
	visitor.userid = getQuerystring("userid");
	//抢当前红包金额
	$.ajax({
		type: "post",
		url: "http://res.wscainiao.com:443/getOnePacket",
		data: JSON.stringify(visitor),
		contentType: "application/json",
		async: true,
		success: function(result) {
			renderRedPacket(result);
		}
	});
}

function renderRedPacket(result) {
	if(!result.isSuccess) {
		$(".money").html(result.result);
	} else {
		$(".money").html(result.result.money + "元");
	}
}