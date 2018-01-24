var url = encodeURIComponent(location.href);
var link = "http://res.wscainiao.com/welfare/index.html?userid=" + getQuerystring("userid");
$.getJSON("http://res.wscainiao.com:443/getTicket?url=" + url, function(result) {
	var data = result.result;
	wxConfig(data.timestamp, data.nonceStr, data.signature);
})

//配置jssdk
function wxConfig(timestamp, nonceStr, signature) {
	wx.config({
		debug: false,
		appId: 'wx73da5380e9bc39de',
		timestamp: timestamp,
		nonceStr: nonceStr,
		signature: signature,
		jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ'
		]
	});
}

wx.ready(function() {
	//监听“分享给朋友”
	wx.onMenuShareAppMessage({
		title: '菜鸟校刊--我为校园代言',
		desc: '',
		link: link,
		imgUrl: 'http://res.wscainiao.com/welfare/img/icon.jpg',
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

	//分享到朋友圈
	wx.onMenuShareTimeline({
		title: '菜鸟校刊--我为校园代言',
		link: link,
		imgUrl: 'http://res.wscainiao.com/welfare/img/icon.jpg',
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

	//分享到QQ
	wx.onMenuShareQQ({
		title: '菜鸟校刊--我为校园代言',
		desc: '',
		link: link,
		imgUrl: 'http://res.wscainiao.com/welfare/img/icon.jpg',
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
});

wx.error(function(res) {
	alert(res.errMsg);
});

function getQuerystring(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}