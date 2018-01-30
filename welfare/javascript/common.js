$(document).ready(function() {
	$(".rob").click(function() {
		$(".red").fadeIn();
		$(".tckdy_nr_two").fadeIn();
	});
	var flag = true;
	$("#open").click(function() {
		if(!flag) {
			return;
		}
		flag = false;
		$(".new-year-but1").addClass("main_jb2");
		setTimeout(function() {
			$(".new-year-but1").removeClass("main_jb2");
		}, 1000);
		setTimeout(function() {
			$(".tckdy_nr_two").fadeOut();
			$(".tckdy_nr").fadeIn();
			robRedPacket();
		}, 1200);
	});
	$(".red").click(function() {
		$(".red").fadeOut();
		$(".tckdy_nr_two").fadeOut();
		$(".tckdy_nr").fadeOut();
		setTimeout(function() {
			location.reload();
		}, 1000);
	});
});

$(document).on("click", ".lookup", function() {
	location.href = "redPacket.html?userid=" + getQuerystring('userid')
})

$(document).on("click", ".index", function() {
	location.href = "index.html?userid=" + getQuerystring('userid')
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
		$(".congratulate").html("");
		$(".money").html(result.result);
	} else {
		$(".congratulate").html("恭喜你，为您的好友抢到");
		$(".money").html(result.result.money + "元");
	}
}

$(".share").click(function() {
	$(".fx").fadeIn();
});
$(".fx").click(function() {
	$(this).fadeOut();
});
