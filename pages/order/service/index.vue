<template>
	<view class="content">
		<view class="head_box box_shadow">
			<view class="label" :class="{alabel: orderActive===item.id}" v-for="(item, index) in orderMenu" :key="index" @click="selectMenuTap(item.id)">
				<view class="tit" :style="{borderColor: orderActive===item.id?'#F54319':'#fff'}">{{item.name}}</view>
			</view>
		</view>
		 <!-- v-if="orderActive!=8" -->
		<view class="orderList">
			<view class="list box_shadow" v-for="(item, index) in orderList" :key="index">
<!-- 				<view class="oheader">
					<view class="left">{{item.store_info.title}}</view>
					<view class="right">
						<view class="status" v-if="item.orderStatus===0">待付款</view>
						<view class="status" v-if="item.orderStatus===1">{{item.delivery_type===1?'待发货':'待自提'}}</view>
						<view class="status" v-if="item.orderStatus===2">待收货</view>
						<view class="status" v-if="item.orderStatus===3" style="color: #19be6b;border-color: #19be6b40;">{{item.evaluate_status?'已完成':'待评价'}}</view>
						<view class="status" v-if="item.orderStatus===4" style="color: #c5c8ce;border-color: #c5c8ce40;">{{item.paypal_type?'已关闭':'已过期'}}</view>
					</view>
				</view> -->
				<view class="oheader">
					<view class="right">
						<span v-if="item.orderStatus===0">待付款</span>
						<span v-else-if="item.orderStatus===2">待发货</span>
						<span v-else-if="item.orderStatus===1">已付款</span>
						<span v-else-if="item.orderStatus===3">待收货</span>
						<span v-else-if="item.orderStatus===7">已失效</span>
						<span v-else-if="item.orderStatus===5">已完成</span>
						<span v-else-if="item.orderStatus===8">退款中</span>
						<span v-else-if="item.orderStatus===9">已退款</span>
					</view>
				</view>
<!-- 				<view class="head">
					<view class="right">
						<span v-if="item.orderStatus===0">待付款</span>
						<span v-else-if="item.orderStatus===2">待发货</span>
						<span v-else-if="item.orderStatus===1">已付款</span>
						<span v-else-if="item.orderStatus===3">待收货</span>
						<span v-else-if="item.orderStatus===7">已失效</span>
						<span v-else-if="item.orderStatus===5">已完成</span>
						<span v-else-if="item.orderStatus===9">已退款</span>
					</view>
				</view> -->
<!-- 				<view class="goods" v-for="item2 in item.orderItemList" :key="item2.id">
					<view class="left">
						<image v-if="item2.goodsSpecification!==null" :src="item2.goodsSpecification.specificationImages" lazy-load="true" mode="aspectFill"></image>
						<image v-else :src="item2.previewUrl" lazy-load="true" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="">
							<view class="title">{{item2.goodName}}</view>
							
						</view>
						<view class="">
							<view class="goodsSpecification" v-if="item2.goodsSpecification!==null" >
									<view class="text" v-for="(value,key) in JSON.parse(item2.goodsSpecification.specificationName)"
								:key="key" >{{key+':'+value}}</view>
							</view>
						</view>
						<view class="box">
							<view class="">
								<view class="num" v-if="item2.goodsSpecification!==null" >{{item2.goodsSpecification.dealPrice}}<span>元</span></view>
								<view class="num" v-else >{{item2.goodsPrice}}</view>
							</view>
							<view class="buy">x{{item2.goodsNum}}</view>
						</view>
					</view>
				</view> -->
				<view class="goodsOne" v-if="item.orderItemList.length===1">
					<view class="goods" v-for="(itm, idx) in item.orderItemList" :key="idx">
						<view class="left">
							<view class="" v-if="itm.goodsSpecification!==null" >
								<image v-if="itm.goodsSpecification.specificationImages!==''"  :src="itm.goodsSpecification.specificationImages" lazy-load="true" mode="aspectFill"></image>
								<image v-else  :src="itm.previewUrl" lazy-load="true" mode="aspectFill"></image>
							</view>
							<image v-else :src="itm.previewUrl" lazy-load="true" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="title">{{itm.goodName}}</view>
							<view class="label">
								<text v-for="(value, name) in itm.goods_spec_name" :key="name">{{name}}:{{value}}</text>
							</view>
							<view class="box">
								<view class="price">¥{{itm.goodsPrice}}</view>
								<view class="number">x{{itm.goodsNum}}</view>
							</view>
						</view>
					</view>
				</view>
<!-- 				<scroll-view scroll-x class="goodsTwo" v-else>
					<view class="goods" v-for="(itm, idx) in item.goods_list" :key="idx">
						<image :src="itm.goods_pic" lazy-load mode="aspectFill"></image>
					</view>
				</scroll-view> -->
				<view class="infoBox">
					<view class="left">
						<view class="label">下单时间：{{item.createTime}}</view>
						<view class="label" style="padding-top: 4rpx;">单号：{{item.orderNo}}</view>
					</view>
					<view class="right">¥{{item.payMoney}}</view>
				</view>
				<view class="ofooter">
					<view class="button" @click="getOrderDetail(item.id)">订单详情</view>
					<view class="button" v-if="orderActive===1" @click="getSericeTap(item.id, 'tk')" style="color: #fff;background-color: #19be6b;border-color: #19be6b;">申请退款</view>
					<view class="button" v-if="orderActive===5" @click="getSericeTap(item.id, 'sh')" style="color: #fff;background-color: #ff9900;border-color: #ff9900;">申请售后</view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
			<view class="none_list_box" v-if="orderList.length===0">
				<image src="../../../static/images/none_data_icon_02.png" mode="widthFix"></image>
				<span v-if="orderActive===1">暂无可退款订单</span>
				<span v-if="orderActive===5">暂无可售后订单</span>
			</view>
		</view>
<!-- 		<view v-else class="orderList">
			<view class="list box_shadow" v-for="(item, index) in serviceList" :key="index">
				<view class="oheader">
					<view class="left">{{item.ctype===1?'申请退款':'申请售后'}}</view>
					<view class="right">
						<view class="status" v-if="item.status===1" style="color: #ff9900;border-color: #ff990040;">待处理</view>
						<view class="status" v-if="item.status===2" style="color: #19be6b;border-color: #19be6b40;">处理成功</view>
						<view class="status" v-if="item.status===3" style="color: #ed4014;border-color: #ed401440;">处理失败</view>
						<view class="status" v-if="item.status===4" style="color: #c5c8ce;border-color: #c5c8ce40;">取消申请</view>
					</view>
				</view>
				<view class="goodsOne" v-if="item.return_goods.length===1">
					<view class="goods" v-for="(itm, idx) in item.return_goods" :key="idx">
						<view class="left">
							<image :src="itm.goods_pic" lazy-load mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="title">{{itm.goods_title}}</view>
							<view class="label">
								<text v-for="(value, name) in itm.goods_spec_name" :key="name">{{name}}:{{value}}</text>
							</view>
							<view class="box">
								<view class="price">申请数量：{{itm.num}}</view>
							</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-x class="goodsTwo" v-else>
					<view class="goods" v-for="(itm, idx) in item.return_goods" :key="idx">
						<image :src="itm.goods_pic" lazy-load mode="aspectFill"></image>
					</view>
				</scroll-view>
				<view class="tinfoBox">
					<view class="text">{{item.ctype===1?'退款':'售后'}}原因：{{item.return_reason}}</view>
					<view class="text" v-if="item.return_reject" style="color: #ed4014;">驳回原因：{{item.return_reject}}</view>
				</view>
				<view class="tfooter">
					<view class="left">
						<view class="text" v-if="item.return_money">退款金额：¥{{item.return_money}}</view>
					</view>
					<view class="right">
						<view class="button" v-if="item.status===1" @click="getServicerDetail(index, 1)">取消申请</view>
						<view class="button" v-if="item.status===3" @click="getServicerDetail(index, 2)">删除申请</view>
						<view class="button" v-if="item.status===3 || item.status===4" @click="getSericeTap(item.order_id, item.ctype===1?'tk':'sh')" style="color: #fff;background-color: #19be6b;border-color: #19be6b;">重新申请</view>
						<view class="text" v-if="item.status===2 && item.return_money">款项已原路退回</view>
						<view class="text" v-if="item.status===2 && !item.return_money">{{item.done_time}}完成</view>
					</view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
			<view class="none_list_box" v-if="serviceList.length===0">
				<image src="../../../static/images/none_data_icon_02.png" mode="widthFix"></image>
				<span v-if="orderActive===6">暂无处理中的订单</span>
			</view>
		</view> -->
		
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				orderMenu: [{
					id: 8,
					name: '处理中'
				}, {
					id: 1,
					name: '申请退款'
				},
				// {
				// 	id: 5,
				// 	name: '申请售后'
				// },
				],
				orderActive: 8,
				page: 1,
				orderList: [],
				serviceList: []
			}
		},
		onShow() {
			let self = this;
			self.getOrderList();
			self.getServiceList();
		},
		methods: {
			selectMenuTap(index) {
				this.orderActive = index;
				console.log(this.orderActive,'测试')
				this.getOrderList();
				this.getServiceList();
			},
			// getOrderList() {
			// 	let self = this;
			// 	uni.showLoading({
			// 		title: '加载中...',
			// 		mask: true
			// 	});
			// 	let curt = self.orderActive;
			// 	let postData = {	
			// 		startPage: self.orderPage.page,
			// 		commentState: -1
			// 	}
			// 	if (curt === 0) {
			// 		// 全部
			// 		postData.orderStatus = -1
			// 	} else if (curt === 1) {
			// 		// 待付款
			// 		postData.orderStatus = 0
			// 	} else if (curt === 2) {
			// 		// 待收货
			// 		postData.orderStatus = 2
			// 	} else if (curt === 3) {
			// 		// 退款/售后
			// 		postData.orderStatus = 5
			// 	}
			// 	self.Get2('/api/order/searchUserOrderListByStatus', postData).then(res => {
			// 		if (res.code === 200) {
			// 			let datas = res.body;
			// 			uni.hideLoading();
			// 			// console.log(res,'订单')
			// 			// self.orderList = data.list;
			// 			self.orderPage.total=datas.pages;
			// 			let data=res.body.list;
			// 			if(datas.pages>1){
			// 				let list = self.orderList.concat(data);
			// 				self.orderList = list;
			// 			}else{
			// 				self.orderList = data;
			// 			}
			// 			console.log(self.orderList, '订单数据列表')
			// 		}
			// 	})
			// },
			getServiceList() {
				let self = this;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let postData = {
					startPage: 1,
					commentState: -1,
					// orderStatus:-1
				}
				if(self.orderActive==8){
					postData.orderStatus=8
				}else if(self.orderActive==1){
					postData.orderStatus=-1
				}
				self.Get2('/api/order/searchUserOrderListByStatus', postData).then(res => {
					if (res.code === 200) {
						let datas = res.body;
						uni.hideLoading();
						// console.log(res,'订单')
						self.orderList = datas.list;
						// self.orderPage.total=datas.pages;
						let data=res.body.list;
						// if(datas.pages>1){
						// 	let list = self.orderList.concat(data);
						// 	self.orderList = list;
						// }else{
						// 	self.orderList = data;
						// }
						console.log(data, '订单数据列表')
					}
				})
				// let postData = {
				// 	status: 0,
				// 	page: 1,
				// 	sizes: 100
				// }
				// if(self.orderActive===6){
				// 	self.Get(self.Url.serviceList, postData).then(res => {
				// 		if(res.code === 0){
				// 			self.serviceList = res.data.list;
				// 		}
				// 	})
				// }
			},
			getOrderList() {
				let self = this;
				let postData = {
					sizes: 100,
					order_type: 1,
					page: self.page,
					status: self.orderActive
				};
				if(self.orderActive!=6){
					uni.showLoading({title: '数据加载中'});
					// api/order/service/list
					// self.Get(self.Url.serviceList, postData).then(res => {
					// 	self.loading = false;
					// 	if(res.code === 0){
					// 		uni.hideLoading();
					// 		self.orderList = res.data.list;
					// 	}else{
					// 		uni.hideLoading();
					// 	}
					// })
				}else{
					self.orderList = [];
				}
			},
			getOrderDetail(id) {
				uni.navigateTo({url: '/pages/order/orderDetail?id='+id});
			},
			getSericeTap(id, type) {
				uni.navigateTo({url: '/pages/order/service/selectgoods?id='+id+'&type='+type});
			},
			getServicerDetail(index, type) {
				let self = this;
				let data = self.serviceList[index];
				if(type===1){
					uni.showModal({
						content: '正等待客服处理中，是否取消申请？',
						success(ces) {
							if(ces.confirm){
								self.getServiceDel({id: data.id, type: type});
							}
						}
					})
				}else if(type===2){
					uni.showModal({
						content: '是否删除该申请？',
						success(ces) {
							if(ces.confirm){
								self.getServiceDel({id: data.id, type: type});
							}
						}
					})
				}
			},
			getServiceDel(data) {
				let self = this;
				self.Get('/api/order/service/del', data).then(res => {
					if(res.code === 0){
						if(data.type===1){
							uni.showToast({title: '取消申请成功'});
						}else if(data.type===2){
							uni.showToast({title: '申请删除成功'});
						}
						self.getServiceList();
					}else{
						uni.showModal({
							content: res.msg,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.head_box{
		display: flex;
		align-items: center;
		height: 120rpx;
		background-color: #fff;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 100;
		.label{
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			.tit{
				color: #666;
				transition: all 0.2s;
				padding-top: 6rpx;
				border-bottom: 3px solid transparent;
				padding-bottom: 10rpx;
				font-size: 30rpx;
			}
		}
		.alabel{
			.tit{
				color: #1c1c1c;
				font-weight: bold;
				border-color: #00d389;
			}
		}
	}
	.orderList{
		// padding-top: 30rpx;
		.list{
			width: 92%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			.oheader{
				display: flex;
				align-items: center;
				width: 92%;
				margin: 0 auto;
				height: 80rpx;
				justify-content: space-between;
				.left{
					flex: 1;
				}
				.right{
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.status{
						font-size: 30rpx;
						color: #19be6b;
						height: 50rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.goodsOne{
				width: 100%;
				background-color: #f5f5f5;
				padding: 30rpx 0;
				.goods{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 90%;
					margin: 0 auto;
					.left{
						width: 170rpx;
						image{
							width: 150rpx;
							height: 150rpx;
							border-radius: 10rpx;
						}
					}
					.right{
						flex: 1;
						min-width: 0;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						height: 140rpx;
						.title{
							width: 100%;
							font-size: 30rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							color: #1c1c1c;
						}
						.label{
							width: 100%;
							font-size: 26rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							color: #999;
						}
						.box{
							display: flex;
							align-items: center;
							justify-content: space-between;
							.price{
								flex: 1;
								color: #1c1c1c;
								font-size: 28rpx;
							}
							.number{
								flex: 1;
								display: flex;
								align-items: center;
								justify-content: flex-end;
								color: #1c1c1c;
								font-size: 30rpx;
							}
						}
					}
				}
			}
			.goodsTwo{
				background-color: #f8f8f8;
				border-top: 1px solid #f5f5f5;
				border-bottom: 1px solid #f5f5f5;
				white-space: nowrap;
				width: 100%;
				height: 110rpx;
				padding: 20rpx 0;
				.goods{
					width: 110rpx;
					height: 110rpx;
					display: inline-block;
					margin-left: 20rpx;
				}
			}
			.infoBox{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 90%;
				margin: 0 auto;
				padding: 20rpx 0;
				.left{
					flex: 1;
					min-width: 0;
					.label{
						font-size: 26rpx;
						line-height: 50rpx;
						color: #1c1c1c;
					}
				}
				.right{
					display: flex;
					justify-content: flex-end;
					align-items: center;
					font-size: 30rpx;
					color: #F54319;
					font-weight: bold;
				}
			}
			.tinfoBox{
				padding: 20rpx 0;
				.text{
					width: 95%;
					margin: 0 auto;
					font-size: 24rpx;
				}
			}
			.ofooter{
				width: 100%;
				height: 86rpx;
				display: flex;
				align-items: flex-start;
				justify-content: flex-end;
				.button{
					font-size: 26rpx;
					margin-right: 30rpx;
					border-radius: 100rpx;
					height: 52rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 0 24rpx;
					border: 1px solid #bbb;
					color: #999;
				}
			}
			.tfooter{
				width: 100%;
				border-top: 1px dashed #f5f5f5;
				height: 80rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.left{
					flex: 0 0 50%;
					.text{
						font-size: 26rpx;
						margin-left: 20rpx;
					}
				}
				.right{
					flex: 0 0 50%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					.button{
						font-size: 24rpx;
						padding: 6rpx 20rpx;
						margin-right: 20rpx;
						border: 1px solid;
						border-radius: 6rpx;
					}
					.text{
						font-size: 26rpx;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
