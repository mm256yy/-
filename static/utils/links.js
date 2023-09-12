let links = {
	/******
	 * 这是API接口列表，请根据需要自行添加
	 * 每一行对应一个API接口
	 * 在页面可以直接使用 this.Get() 或 this.Post() 进行调用
	 * 请务必注意接口的请求方式，get,post 要区分开
	 * 如果接口达不到开发需求或想新增接口，请联系QQ：1172007555
	 *******/
	'wechatLogin': '/api/login/wechat',
	'wechatDetail': '/api/register/wechat/detail',
	'checkToken': '/api/check/token',
	'shopInfo': '/api/shop/info',
	'userInfo': '/api/user/money',
	// 'userEdit': '/api/user/edit/data',
	'userEdit':'/api/user/updateUserInfo',
	'userLevelList': '/api/user/level/list',
	'userLevelBuy': '/api/user/level/buy',
	'userRecord': '/api/user/money/record',
	'bannerList': '/api/plugin/banner/list',
	'addressList': '/api/address/list',
	'addressEdit': '/api/address/edit',
	'addressDel': '/api/address/del',
	'noticeList': '/api/plugin/notice/list',
	'noticeDetail': '/api/plugin/notice/detail',
	'goodsList': '/api/goods/list',
	'goodsDetail': '/api/goods/detail',
	'categoryList': '/api/category/list',
	'cartAdd': '/api/plugin/cart/add',
	'cartEdit': '/api/plugin/cart/edit',
	'cartList': '/api/plugin/cart/list',
	'cartTypeList': '/api/plugin/cart/type/list',
	'cartTypeDel': '/api/plugin/cart/type/del',
	'cartTypeDetails': '/api/plugin/cart/type/details',
	'favoriteAdd': '/api/plugin/favorite/add',
	'favoriteList': '/api/plugin/favorite/list',

	'orderPaypal': '/api/order/paypal',

	// 'uploadFile': '/api/overall/upload/file',
	'uploadFile': '/api/file/uploadImages',
	'messageWechat': '/api/overall/message/wechat',
	'qrcodeWechat': '/api/overall/qrcode/wechat',
	'brandInfo': '/api/brand/info',
	'orderDetail': '/api/order/detail',
	'serviceForm': '/api/order/service',
	'serviceList': '/api/order/service/list',
		'invoiceassistantList': '/api/plugin/invoiceassistant/list',
}

module.exports = {
	links: links
}
