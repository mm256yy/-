import JSONBig from 'json-bigint'
// const domainLinks = 'http://192.168.31.47:7001';
const domainLinks = 'https://api.daccf.com';

function serverGet(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/x-www-form-urlencoded",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH"
		};
		let postData = data;
		uni.request({
			url: domainLinks + url,
			data: postData,
			method: 'GET',
			header: headers,
			dataType: 'string',
			success: function(res) {
				let obj1 = JSONBig.parse(res.data)
				resolve(obj1);
			}
		})
	});
	return promise;
}

function serverGet2(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/x-www-form-urlencoded",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH"
		};
		let postData = data;
		uni.showLoading({
			title: '加载中...'
		})
		uni.request({
			url: domainLinks + url,
			data: postData,
			method: 'GET',
			header: headers,
			dataType: 'string', //手动处理19位数字精度问题
			success: function(res) {
				uni.hideLoading();
				let obj1 = JSONBig.parse(res.data)
				resolve(obj1);
			}
		})
	});
	return promise;
}

function serverPost(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/x-www-form-urlencoded",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH"
		};
		let postData = data;
		uni.request({
			url: domainLinks + url,
			data: postData,
			method: 'POST',
			header: headers,
			dataType: 'string',
			success: function(res) {
				let obj1 = JSONBig.parse(res.data)
				resolve(obj1);
			}
		})
	});
	return promise;
}

function serverPost2(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/json",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH",
		};
		let postData = data;
		uni.request({
			url: domainLinks + url,
			data: postData,
			method: 'POST',
			header: headers,
			dataType: 'string',
			success: function(res) {
				let obj1 = JSONBig.parse(res.data)
				resolve(obj1);
			}
		})
	});
	return promise;
}

function serverPost3(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/json",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH"
		};
		data.userServiceToken = "T2UZ8Z79OFNYZ962F85XH"
		let postData = data;
		uni.request({
			url: domainLinks + url,
			data: postData,
			method: 'POST',
			header: headers,
			dataType: 'string',
			success: function(res) {
				let obj1 = JSONBig.parse(res.data)
				resolve(obj1);
			}
		})
	});
	return promise;
}



function serverUpload(url, data) {
	let promise = new Promise((resolve) => {
		let headers = {
			"testToken": "2gq72h2qrbhx256y0167uf5wd64ls55u",
			"BGDEBUG": 0,
			"requestType": "web",
			"Authorization": uni.getStorageSync('__ddminiUserInfo').accessToken || "",
			"Content-Type": "application/json",
			"ADMIN_ID": '69',
			"user_service_token": "T2UZ8Z79OFNYZ962F85XH"
		};
		uni.uploadFile({
			url: domainLinks + url,
			filePath: data.file,
			formData: data || {},
			name: 'file',
			dataType: 'string',
			header: headers,
			success: (res) => {
				let json = JSONBig.parse(res.data);
				resolve(json);
			}
		});
	});
	return promise;
}

function templateConfig() {
	let promise = new Promise((resolve) => {
		uni.request({
			url: domainLinks + '/api/template/yipins',
			method: 'GET',
			header: {
				'template-key': templateKey, //模版服务码
				'miniapps-key': uni.getAccountInfoSync().miniProgram.appId, //小程序AppID
			},
			success: function(res) {
				resolve(res.data);
			}
		})
	});
	return promise;
}

module.exports = {
	get: serverGet,
	get2: serverGet2,
	post: serverPost,
	post2: serverPost2,
	post3: serverPost3,
	upload: serverUpload,
	config: templateConfig
}