<template>
	<view class="content" v-if="orderDetail">	
		<view class="orderBox">
			<view class="order">
				<view class="label">
					<view class="title">订单编号</view>
					<view class="number">{{orderDetail.orderNo}}</view>
				</view>
				<view class="label">
					<view class="title">下单时间</view>
					<view class="number">{{orderDetail.createTime}}</view>
				</view>
				<view class="label" v-if="orderDetail.payTime">
					<view class="title">支付时间</view>
					<view class="number">{{orderDetail.payTime}}</view>
				</view>
				<view class="label" v-if="orderDetail.paypal_type">
					<view class="title">支付方式</view>
					<view class="number">
						<text v-if="orderDetail.paypal_type==1">微信支付</text>
						<text v-if="orderDetail.paypal_type==2">货到付款</text>
						<text v-if="orderDetail.paypal_type==3">余额支付</text>
						<text v-if="orderDetail.paypal_type==4">线下支付</text>
					</view>
				</view>
				<view class="label">
					<view class="title">实际支付</view>
					<view class="number">¥{{orderDetail.payMoney}}</view>
				</view>
				<view v-if="orderType=='tk'" class="label">
					<view class="title">退款状态</view>
					<view class="number">{{orderDetail.orderStatus==9?'已退款':'未申请过退款'}}</view>
				</view>
				<view v-if="orderType=='sh'" class="label">
					<view class="title">售后状态</view>
					<view class="number">{{orderDetail.service_status?'已申请过售后':'未申请过售后'}}</view>
				</view>
			</view>
		</view>
		<view class="goodsBox">
			<view class="goods box_shadow" v-for="(item, index) in orderDetail.orderItemList" :key="index" @click="selectGoodsTap(index)">
<!-- 				<view class="icons">
					<aicon v-if="item.active" type="checkbox-circle-fill" color="#F54319" size="25"></aicon>
					<aicon v-else type="checkbox-blank-circle-line" color="#eee" size="25"></aicon>
				</view> -->
				<view class="image">
					<image v-if="item.goodsSpecification!==null" :src="item.goodsSpecification.specificationImages" lazy-load="true" mode="aspectFill"></image>
					<image v-else :src="item.previewUrl" lazy-load="true" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="title">{{item.goodName}}</view>
					<view class="label" v-if="item.goods_spec_name">
						<text v-for="(value, name) in item.goods_spec_name" :key="name">{{name}}:{{value}}</text>
					</view>
					<view class="price">¥<text>{{item.goodsPrice}}</text></view>
					<view class="foobox">
						<view class="nums">最多可申请{{item.goodsNum}}件</view>
<!-- 						<view class="numbox">
							<view class="buy">
								<view class="btn" @click.stop="editGoods(index, 'jian')">
									<aicon type="indeterminate-circle-fill" size="25" :color="item.return_apply<=1?'#eee':'#F54319'"></aicon>
								</view>
								<view class="input">
									<input type="number" disabled :value="item.return_apply" />
								</view>
								<view v-if="orderType=='tk'" class="btn" @click.stop="editGoods(index, 'jia')">
									<aicon type="add-circle-fill" size="25" color="#F54319"></aicon>
								</view>
								<view v-else class="btn" @click.stop="editGoods(index, 'jia')">
									<aicon type="add-circle-fill" size="25" color="#F54319"></aicon>
								</view>
							</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<view class="seat_box">
			<view class="seat"></view>
		</view>
		<view class="footer box_shadow">
			<view class="label">
				<view class="button" v-if="selectGoodsActive" @click="getTuikuanTap()">申请{{orderType=='tk'?'退款':'售后'}}</view>
				<view class="button" style="opacity: .5;" v-else>申请{{orderType=='tk'?'退款':'售后'}}</view>
			</view>
		</view>
		
		<u-popup :show="tuikuanShow" mode="bottom" :round="10" @close="tuikuanShow=false">
			<view class="tuikuan_form_box">
				<view class="head">填写{{orderType=='tk'?'退款':'售后'}}信息</view>
				<view class="form_box">
<!-- 					<view class="label" v-if="orderType=='tk'">
						<view class="title"><span>*</span>退款金额</view>
						<view class="input">
							<input type="digit" v-model="returnData.return_money" :placeholder="'请输入退款金额，最多可退¥'+returnData.return_total">
						</view>
					</view> -->
					<view class="label">
						<view class="title"><span>*</span>{{orderType=='tk'?'退款':'售后'}}原因</view>
						<view class="input">
							<textarea :placeholder="'请输入'+(orderType=='tk'?'退款':'售后')+'原因'" v-model="returnData.return_reason"></textarea>
						</view>
					</view>
<!-- 					<view class="label">
						<view class="title">附件图片</view>
						<view class="image">
							<view class="img" v-for="(itm, idx) in returnData.return_pics" :key="idx">
								<image :src="itm.pic" mode="aspectFit" lazy-load></image>
								<aicon type="close-circle-fill" size="26" color="#f82b45" @click="delImageTap(idx)"></aicon>
							</view>
							<view v-if="returnData.return_pics.length<4" class="add" @click="selectImagesTap()">
								<aicon type="landscape-fill" size="30" color="#e2e2e2"></aicon>
							</view>
						</view>
					</view> -->
					<view class="button_box">
						<view class="button" @click="sentTuikuanTap()">确认申请{{orderType=='tk'?'退款':'售后'}}</view>
					</view>
				</view>
			</view>
		</u-popup>
		
		<view v-if="false" class="showGoodsBox">
			<view class="bg" @click="tuikuanShow=false"></view>
			<view class="showGoods">
				<view class="sheader">填写{{orderType=='tk'?'退款':'售后'}}信息</view>
<!-- 				<view class="label" v-if="orderType=='tk'">
					<view class="title"><span>*</span>退款金额</view>
					<view class="input">
						<input type="digit" v-model="returnData.return_money" :placeholder="'请输入退款金额，最多可退¥'+returnData.return_total">
					</view>
				</view> -->
				<view class="label">
					<view class="title"><span>*</span>{{orderType=='tk'?'退款':'售后'}}原因</view>
					<view class="textarea">
						<textarea :placeholder="'请输入'+(orderType=='tk'?'退款':'售后')+'原因'" v-model="returnData.return_reason"></textarea>
					</view>
				</view>
<!-- 				<view class="label">
					<view class="title">附件图片</view>
					<view class="image">
						<view class="img" v-for="(itm, idx) in returnData.return_pics" :key="idx">
							<image :src="itm.pic" mode="aspectFit" lazy-load></image>
							<icon type="shanchujiao" size="22" @click="delImageTap(idx)" color="#f82b45"></icon>
						</view>
						<view v-if="returnData.return_pics.length<4" class="add" @click="selectImagesTap()">
							<icon type="jia2" size="30" color="#bbb"></icon>
						</view>
					</view>
				</view> -->
				<view class="sfooter">
					<view class="button" :style="'background-color:'+template.color.color1" @click="sentTuikuanTap()">确认申请{{orderType=='tk'?'退款':'售后'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				orderId: '',
				orderType: '',
				orderDetail: '',
				selectGoodsActive: false,
				tuikuanShow: false,
				returnData: {
					// order_id: '',//订单ID
					// order_total: 0,//订单实际支付金额
					return_money: 0,//申请退款金额
					// return_total: 0,//还可以退款金额
					// return_goods: [],//退款商品列表
					return_reason: '',//退款原因说明
					// return_pics: [],//退款附件图片
				}
			}
		},
		onLoad(e) {
			let self = this;
			if(e.type=='tk'){
				uni.setNavigationBarTitle({title: '选择退款商品'});
				self.orderType = e.type;
			}else{
				uni.setNavigationBarTitle({title: '选择售后商品'});
				self.orderType = e.type;
			}
			if(e.id){
				self.orderId = e.id
				self.getOrderDetail();
			}else{
				uni.showModal({
					content: '订单不存在，请检查后重试',
					showCancel: false,
					success(res) {
						if(res.confirm){
							uni.navigateBack();
						}
					}
				})
			}
		},
		methods: {
			// getOrderDetail() {
			// 	let self = this;
			// 	uni.showLoading({title: '订单加载中', mask: true});
			// 	self.Get(self.Url.orderDetail, {id: self.orderId}).then(res => {
			// 		if(res.code === 0){
			// 			uni.hideLoading();
			// 			let data = res.data;
			// 			data.goods_list.forEach((itm, idx) => {
			// 				if(self.orderType=='tk'){
			// 					data.goods_list[idx].return_apply = itm.return_num;
			// 				}else{
			// 					data.goods_list[idx].return_apply = itm.service_num;
			// 				}
			// 			})
			// 			self.orderDetail = data;
			// 		}
			// 	});
			// },
			getOrderDetail() {
				let self = this;
				uni.showLoading({
					title: '订单加载中',
					mask: true
				});
				self.Get2(`/api/order/getOrderInfoById?id=${self.orderId}`).then(res => {
					if (res.code === 200) {
						uni.hideLoading();
						let list = res.body;
						console.log(res, '订单详情')
						self.orderDetail = list;
						self.addessData = JSON.parse(list.orderLogistics.receiverAddressJson);
						let timestamp = list.createTime
						let payTime = list.payTime
					} else {
						uni.hideLoading();
					}
				})
			},
			editGoods(index, type) {
				let self = this;
			
				let data = self.orderDetail.orderItemList[index];
				console.log(self.orderDetail.orderItemList[index],'1111')
				if(type=='jia'){
					if(self.orderType=='tk'){
						if(data.return_apply>=data.return_num){
							uni.showToast({title: '此商品最多可申请'+data.return_num+'件', icon: 'none'});
							return
						}else{
							self.orderDetail.goods_list[index].return_apply++;
						}
					}else{
						if(data.return_apply>=data.service_num){
							uni.showToast({title: '此商品最多可申请'+data.service_num+'件', icon: 'none'});
							return
						}else{
							self.orderDetail.goods_list[index].return_apply++;
						}
					}
				}else if(type=='jian'){
					if(data.return_apply>1){
						self.orderDetail.goods_list[index].return_apply--;
					}
				}
			},
			selectGoodsTap(index) {
				let self = this;
				let data = self.orderDetail.orderItemList[index];
				// if(self.orderType=='tk'){
				// 	if(data.return_num){
				// 		data.active = !data.active;
				// 		self.$set(self.orderDetail.goods_list, index, data);
				// 	}else{
				// 		uni.showToast({title: '不能在选择该商品', icon: 'none'});
				// 	}
				// }else{
				// 	if(data.service_num){
				// 		data.active = !data.active;
				// 		self.$set(self.orderDetail.goods_list, index, data);
				// 	}else{
				// 		uni.showToast({title: '不能在选择该商品', icon: 'none'});
				// 	}
				// }
				self.checkGoodsStatus();
			},
			checkGoodsStatus() {
				let self = this;
				let data = self.orderDetail.orderItemList;
				let list = [];
				// data.forEach(itm => {
				// 	if(itm.active){
				// 		list.push(itm);
				// 	}
				// })
				// if(list.length>0){
					self.selectGoodsActive = true;
				// }else{
					// self.selectGoodsActive = false;
				// }
			},
			selectImagesTap() {
				let self = this;
				let number = self.returnData.return_pics.length===0?4:4-self.returnData.return_pics.length
				uni.chooseImage({
				    count: number, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
						let data = res.tempFilePaths;
						data.forEach(lis => {
							self.Upload(self.Url.uploadFile, lis).then(ups => {
								if(ups.code === 0){
									self.returnData.return_pics.push({pic: ups.url});
								}else{
									uni.showModal({
										title: '上传失败',
										content: ups.msg,
										showCancel: false
									})
									return
								}
							})
						});
				    }
				});
			},
			delImageTap(index) {
				let self = this;
				self.returnData.return_pics.splice(index, 1);
			},
			getTuikuanTap() {
				let self = this;
				let data = self.orderDetail;
				self.returnData.return_money = data.total_money-data.return_money;
				self.returnData.return_total = data.total_money-data.return_money;
				self.tuikuanShow = true;
			},
			sentTuikuanTap() {
				// Submitrefund(){
				// 	let self=this;
				// 	let data=self.orderInfo;
				// 	if(! data.applyRemark){
				// 		uni.showModal({
				// 			title: '提示',
				// 			content: '请输入退款原因',
				// 			showCancel: false
				// 		});
				// 		return
				// 	}else{
				// 		self.Post('/api/order/userApplyOrderRefund',data).then(res=>{
				// 			if(res.code==200){
				// 				uni.showToast({
				// 					title: '提交成功',
				// 					duration: 800
				// 				});
				// 				setTimeout(function() {
				// 					uni.switchTab({
				// 						url:'/pages/order/applysucc'
				// 					})
				// 				}, 500)
				// 			}
				// 		})
				// 	}
					
				// }
				let self = this;
				let data = self.orderDetail;
				let retu = self.returnData;
				let type = self.orderType;
				let list = [];
				// data.goods_list.forEach(itm => {
				// 	if(itm.active){
				// 		list.push({id: itm.id, num: itm.return_apply});
				// 	}
				// })
				// if(list.length===0){
				// 	return uni.showToast({title: '未选择商品，请选择后在申请', icon: 'none'});
				// }
				// if(type=='tk' && !retu.return_money){
				// 	return uni.showToast({title: '未填写退款金额，请填写后在申请', icon: 'none'});
				// }
				// if(type=='tk' && retu.return_money > retu.return_total){
				// 	return uni.showToast({title: '退款金额不能大于实际支付金额，请修改后在申请', icon: 'none'});
				// }
				// if(!retu.return_reason){
				// 	return uni.showToast({title: '未填写'+(type=='tk'?'退款':'售后')+'原因，请填写后在申请', icon: 'none'});
				// }
				let postData = {
					order_id: data.id,
					return_goods: list,
					return_reason: retu.return_reason,
					return_pics: retu.return_pics
				}
				if(type=='tk'){
					postData.ctype = 1;
					postData.return_money = retu.return_money;
				}else{
					postData.ctype = 2;
				}
				// 		self.Post('/api/order/userApplyOrderRefund',data).then(res=>{
				// 			if(res.code==200){
				// 				uni.showToast({
				// 					title: '提交成功',
				// 					duration: 800
				// 				});
				// 				setTimeout(function() {
				// 					uni.switchTab({
				// 						url:'/pages/order/applysucc'
				// 					})
				// 				}, 500)
				// 			}
				// 		})
				let parmas={
					orderNo:self.orderDetail.orderNo,
					applyRemark:self.returnData.return_reason
				}
				if(!parmas.applyRemarky){
					return uni.showToast({title: '未填写退款金额，请填写后在申请', icon: 'none'});
				}
				self.Post('/api/order/userApplyOrderRefund', parmas).then(res => {
					if(res.code === 200){
						uni.showModal({
							content: (type=='tk'?'退款':'售后')+'申请成功，请等待商家处理，如有疑问请联系客服',
							showCancel: false,
							success(ces) {
								if(ces.confirm){
									uni.navigateBack();
								}
							}
						})
					}else{
						uni.showModal({
							content: res.msg,
							showCancel: false
						})
						return
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.orderBox{
		width: 100%;
		background-color: #fff;
		.order{
			width: 90%;
			margin: 0 auto;
			padding: 20rpx 0;
			.label{
				display: flex;
				align-items: center;
				height: 80rpx;
				position: relative;
				.title{
					font-size: 28rpx;
					color: #999;
					text{
						font-size: 28rpx;
						padding-left: 10rpx;
					}
				}
				.number{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					font-size: 28rpx;
					color: #1c1c1c;
				}
			}
		}
	}
	.goodsBox{
		border-top: 1px solid #efefef;
		.goods{
			width: 100%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #fff;
			padding: 30rpx 0;
			.icons{
				width: 90rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
			.image{
				width: 200rpx;
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 20rpx;
				}
			}
			.info{
				flex: 1;
				min-width: 0;
				height: 180rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title{
					width: 95%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 28rpx;
					color: #1c1c1c;
					font-weight: bold;
				}
				.label{
					width: 95%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 26rpx;
					color: #1c1c1c;
				}
				.price{
					color: #F54319;
					font-size: 30rpx;
				}
				.foobox{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 95%;
					.nums{
						font-size: 24rpx;
						color: #999;
					}
					.numbox{
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.buy{
							display: flex;
							align-items: center;
							.btn{
								width: 50rpx;
								height: 50rpx;
								display: flex;
								align-items: center;
								justify-content: center;
								aicon{
									width: 100%;
									height: 100%;
									display: flex;
									align-items: center;
									justify-content: center;
								}
							}
							.input{
								width: 100rpx;
								height: 50rpx;
								background-color: #eee;
								margin: 0 6rpx;
								border-radius: 100rpx;
								input{
									width: 100%;
									height: 100%;
									text-align: center;
									font-size: 30rpx;
									color: #1c1c1c;
								}
							}
						}
						.none{
							color: #999;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background-color: #fff;
		padding-bottom: env(safe-area-inset-bottom);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.label{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 120rpx;
			width: 100%;
			.button{
				width: 92%;
				margin: 0 auto;
				height: 80rpx;
				border-radius: 100rpx;
				color: #fff;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #F54319;
			}
		}
	}
	
	.tuikuan_form_box{
		.head{
			color: #1c1c1c;
			font-size: 32rpx;
			font-weight: bold;
			height: 110rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.form_box{
			width: 90%;
			margin: 0 auto;
			padding: 20rpx 0;
			.label{
				display: flex;
				width: 90%;
				margin: 0 auto;
				margin-bottom: 30rpx;
				.title{
					width: 160rpx;
					color: #1c1c1c;
					font-size: 28rpx;
					position: relative;
					height: 80rpx;
					display: flex;
					align-items: center;
					span{
						color: #F54319;
						font-size: 26rpx;
						position: absolute;
						left: -20rpx;
						top: 26rpx;
					}
				}
				.input{
					flex: 1;
					min-width: 0;
					min-height: 80rpx;
					border: 1px solid #eee;
					border-radius: 10rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					input{
						width: 90%;
						font-size: 30rpx;
						color: #1c1c1c;
						height: 100%;
					}
					textarea{
						width: 92%;
						padding: 16rpx 0;
						height: 150rpx;
						color: #1c1c1c;
						font-size: 30rpx;
					}
				}
				.image{
					flex: 1;
					min-width: 0;
					display: flex;
					align-items: center;
					.img{
						width: 92rpx;
						height: 92rpx;
						position: relative;
						margin-right: 20rpx;
						image{
							border-radius: 10rpx;
						}
						aicon{
							position: absolute;
							top: -12rpx;
							right: -12rpx;
						}
					}
					.add{
						width: 92rpx;
						height: 92rpx;
						background-color: #f5f5f5;
						border-radius: 10rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
			.button_box{
				width: 90%;
				margin: 0 auto;
				padding: 40rpx 0 20rpx;
				display: flex;
				justify-content: center;
				.button{
					width: 100%;
					height: 80rpx;
					color: #fff;
					background-color: #F54319;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 100rpx;
					font-size: 30rpx;
				}
			}
		}
	}
	
	
	
	
	
	.showGoodsBox{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		transition: all .5s;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0,0,0,.1);
		.bg{
			position: absolute;
			z-index: 1001;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
		}
		.showGoods{
			width: 85%;
			overflow: hidden;
			min-height: 300rpx;
			position: absolute;
			z-index: 1002;
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0 0 20rpx rgba(0,0,0,.08);
			margin-top: -5%;
			.sheader{
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				border-bottom: 1px solid #f5f5f5;
				margin-bottom: 20rpx;
			}
			.label{
				width: 90%;
				margin: 0 auto;
				padding-bottom: 20rpx;
				.title{
					font-size: 26rpx;
					padding-bottom: 10rpx;
					display: flex;
					align-items: center;
					span{
						color:#ed4014;
						margin-right: 4rpx;
					}
				}
				.input{
					width: 100%;
					height: 70rpx;
					border: 1px solid #f5f5f5;
					display: flex;
					align-items: center;
					input{
						width: 95%;
						margin: 0 auto;
						height: 100%;
						font-size: 26rpx;
					}
				}
				.textarea{
					width: 100%;
					height: 200rpx;
					border: 1px solid #f5f5f5;
					display: flex;
					align-items: center;
					justify-content: center;
					textarea{
						width: 95%;
						height: 90%;
						font-size: 26rpx;
					}
				}
				.image{
					display: flex;
					align-items: center;
					.add{
						width: 130rpx;
						height: 130rpx;
						border: 1px solid #f5f5f5;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					.img{
						width: 130rpx;
						height: 130rpx;
						border: 1px solid #f5f5f5;
						margin-right: 10rpx;
						position: relative;
						icon{
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					.img:nth-child(4){
						margin-right: 0;
					}
				}
			}
			.sfooter{
				width: 100%;
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.button{
					width: 90%;
					height: 70rpx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>
