<template>
	<view class="content">
		<view class="head_box box_shadow">
			<view class="label" :class="{alabel: orderActive===item.id}" v-for="(item, index) in orderMenu" :key="index"
				@click="selectMenuTap(item.id)">
				<view class="tit" :style="{borderColor: orderActive===item.id?'#F54319':'#fff'}">{{item.name}}</view>
			</view>
		</view>
		<view class="order_list_box">
			<view class="order box_shadow" v-for="(item, index) in orderList" :key="index"
				@click="getDetailsTap(item.id)">
				<view class="head">
					<view class="right">
						<span v-if="item.orderStatus===0">待付款</span>
						<span v-else-if="item.orderStatus===2">待发货</span>
						<span v-else-if="item.orderStatus===1">已付款</span>
						<span v-else-if="item.orderStatus===3">待收货</span>
						<span v-else-if="item.orderStatus===7">已失效</span>
						<span v-else-if="item.orderStatus===5">已完成</span>
						<span v-else-if="item.orderStatus===9">已退款</span>
					</view>
				</view>
				<view class="goods_box">
					<view class="goods" v-for="item2 in item.orderItemList" :key="item2.id">
						<view class="left">
							<view class="" v-if="item2.goodsSpecification!==null" >
								<image v-if="item2.goodsSpecification.specificationImages!==''"  :src="item2.goodsSpecification.specificationImages" lazy-load="true" mode="aspectFill"></image>
								<image v-else  :src="item2.previewUrl" lazy-load="true" mode="aspectFill"></image>
							</view>
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
								<!-- <view class="goodsSpecification" v-else >
									<view class="text" >{{item2.goodsSpecificationName}}</view>
								</view> -->
							</view>
							<view class="box">
								<view class="">
									<view class="num" v-if="item2.goodsSpecification!==null" >{{item2.goodsSpecification.dealPrice}}<span>元</span></view>
									<view class="num" v-else >{{item2.goodsPrice}}</view>
								</view>
								<view class="buy">x{{item2.goodsNum}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="foot">
					<view class="left">实际支付：<span :style="{color: '#F54319'}">{{item.payMoney}}元</span></view>
					<view class="right">
						<view v-if="item.orderStatus==0 && item.orderExpireRemainTime>0" 
							:style="{backgroundColor: '#F54319', borderColor: '#F54319', color: '#fff'}" class="button"
							@click.stop="getPaypalOrder(index)">
							<span>立即支付</span>
							<u-count-down :time="item.orderExpireRemainTime*1000" format="mm:ss"></u-count-down>
						</view>
						<!-- <view class="refund button" v-if="item.orderStatus==2 || item.orderStatus==1">
							申请退款
						</view> -->
						<view v-else class="button"
							@click.stop="getOrderDel(item.id,index)">删除订单</view>
					</view>
				</view>
			</view>

			<view class="none_list_box" v-if="orderList.length===0">
				<image src="../../static/images/none_data_icon_02.png" lazy-load="true" mode="widthFix"></image>
				<span>暂无相关订单</span>
			</view>
		</view>

		<view class="seat_box">
			<view class="seat"></view>
		</view>
		<backtop ref="VT" :scrollTop="top"></backtop>
		<!-- <paypalType :paypalShow="paypalShow" :money="userData.moneys" @close="paypalShow=false" @paypal="getPaypalOrder"></paypalType> -->
	</view>
</template>

<script>
	import md5 from "../../static/utils/md5.js"
	const app = getApp();
	export default {
		data() {
			return {
				paypalShow: false,
				userData: '',
				top: 0,
				paypalOrder: '',
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				openId: uni.getStorageSync('__ddminiUserOpenid'),
				businessId: uni.getStorageSync('__ddminiStoreInfo'),
				payList: '',
				orderMenu: [
					 {
					id: 0,
					name: '全部'
				}, {
					id: 1,
					name: '待付款'
				}, {
					id: 2,
					name: '待配送/自提'
				},{
					id:3,
					name: '已完成'
				}],
				orderActive: 0,
				orderPage: {
					page: 1,
					sizes: 10,
					total: 0
				},
				orderList: [],
			}
		},
		onLoad(e) {
			let self = this;
			if (e.id) {
				let id = Number(e.id);
				self.orderActive = id;
			}
		},
		onPageScroll(e) {
			this.$refs.VT.topData(e.scrollTop)
		},
		onShow() {
			let self = this;
			self.orderPage.page = 1;
			self.orderList = [];
			self.getOrderList();
		},
		onReachBottom() {
			let self = this;
			if (self.orderPage.total > self.orderPage.page) {
				self.orderPage.page++;
				self.getOrderList();
			}
		},
		methods: {
			specNameText(data) {
				if (data) {
					let list = Object.keys(data);
					let str = '';
					list.forEach((itm, idx) => {
						str += `${data[itm]}${(idx+1)===list.length?'':','}`
					})
					return str
				}
			},
			totalCountDown(time) {
				let date = new Date().getTime();
				return time - date
			},
			selectMenuTap(id) {
				let self = this;
				self.orderActive = id;
				self.orderPage.page = 1;
				self.orderList = [];
				self.getOrderList();
			},
			getOrderList() {
				let self = this;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				let curt = self.orderActive;
				let postData = {	
					startPage: self.orderPage.page,
					// orderStatus:-1,
					commentState: -1
				}
				// let postData = {
				// 	startPage: 1,
				// 	orderStatus:1,
				// 	commentState: -1
				// }
				if (curt === 0) {
					// 全部
					postData.orderStatus = -1
				} else if (curt === 1) {
					// 待付款
					postData.orderStatus = 0
				} else if (curt === 2) {
					// 待收货
					postData.orderStatus = 2
				} else if (curt === 3) {
					// 退款/售后
					postData.orderStatus = 5
				}
				self.Get2('/api/order/searchUserOrderListByStatus', postData).then(res => {
					if (res.code === 200) {
						let datas = res.body;
						uni.hideLoading();
						// console.log(res,'订单')
						// self.orderList = data.list;
						self.orderPage.total=datas.pages;
						let data=res.body.list;
						if(datas.pages>1){
							let list = self.orderList.concat(data);
							self.orderList = list;
						}else{
							self.orderList = data;
						}
						console.log(self.orderList, '订单数据列表')
					}
				})
			},
			getorderDetail() {
				let self = this;

			},
			getPaypalOrder(i) {
							let self = this;
							let postData = {
								client: '小程序',
								  openId: self.openId,
								  orderId: self.orderList[i].id,
								  orderNo: self.orderList[i].orderNo,
								  payMoney: self.orderList[i].payMoney,
								payWay: 1,
								payType: 0,
								businessId: self.businessId
							};
							uni.showLoading({
								title: '支付准备中',
								mask: true
							});
							self.Post2('/api/pay/partnerAppletsWechatOrderPay', postData).then(res => {
								if (res.code === 200) {
									self.payList = res.body;
									let data = res.body;
									var RSA = require('@/static/utils/wxapp_rsa.js')
									let paySign =
										`${data.appid}\n${data.timestamp}\n${data.noncestr}\nprepay_id=${data.prepay_id}\n`
									// 私钥、商户API证书下载后，私钥 apiclient_key.pem 的内容
									let sikey = `-----BEGIN PRIVATE KEY-----
			MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkKmpbnA4QnZmD
			OVLPPORVj6YNLW+kdc17raHgMng5FXVZ3D6ZxthYHgnJUMSGD82BdqVmOwOvkhwt
			hyCl8gpEi5JOr/88UMlSEwrwQWhKFQFA4SpMW489H+yuQkcUKKHZYQgOGgEoFN8r
			WvqYfhBgixxcoDlzcp4VKzCrM6yibD+BkVBcjRdrWFQhloQyR/Dc+HDAZsQYXlJi
			moUGeYq/BDircT8Vfs8wB3fTx7FoBqfbvkposv+VjjijEAhCR6VRaV7MKPTR4nof
			fo7gHcTg6CGlQaepfwOF4rDmZPFVQXIgphAF17OGUTbw45jpAplWLzh3XYdNvawU
			EZz5MPmzAgMBAAECggEAPTIKf6fGnm8BQKdntRTv0O1Bavwa9+Vp+caZ5ycpJa5Y
			Fm1BcLVtBDv+TesrtwXBB5egxGEPWK1Qj7AlfXaiWTbmDSsSK/u5cDzlAPaA18zI
			sNS+ncQruw9hfPv73wnee1fuVsNe1wAgyNqbO6kSlcqFggnAIMcDIsT82XTjz4+N
			of6sJxQfCwSOR3WKV4r+9F4KXPgre+0wm5aNSQhW1KfV1r918DtHjcDxtvOZn7PB
			GFj/xx3UacZdDOfauqZSMf4ZghCHBCBH/LOVmk3hqEokHHdzP36dm6/CkVoK+sbF
			FYCNlD/t1FUShXbEh+iHnSPbA51Vo5f1+OPKlW99AQKBgQDSJFcWLXuW8DIyz+UN
			5ZL++nFkSWyAShACeOC81fk6wEiatmbmAa0Qs6OcAJuYDeRwt47FX9fsNvm9hud8
			BueYNPmmC0mhO1PSRWQCKDghY+F0/nSV8QB44pR5o7m2yV+B/Pyg12qbBOTg3NLY
			yKYpaxwcDFWEEmRLusAZCLizcwKBgQDH/Zf4W58yUTzK/l3iY4luYZBDMjA5/yFv
			kndQxqsGpzS6KQtOCS5RLhC+1176h8lNy7NdNqca6x15QJ2UhqUOeFVcqbatjaL2
			bv4gro4j2nVOgKmR03fto7s3BKtPHlFPON//R28bWmPm+ap/S/aWS6doNQpOCqW1
			mLKI5LuQwQKBgGbbXrz+OjYhD5ELbSQmMJMZZpMd1TveBIQRQn9rhHgbUe5YRXlj
			bKB2LSjYq0/7zMrXLcyyIu/94LPB6mAsyQMZOvDpKXr/nQGY8WCU6xR83Qf03H/f
			3MlOrjnzx50OZ+8qM0VO62FBPf5KV/HAFITFZpbb+qeQkQL4P7qBKFa9AoGBAKal
			aAbpweQZ0YCNKQpGSvSRk7aKkakiMWhZMdc7VLP8jHE7VlI2UEQREJ8Vs+0rTNDo
			lpNrwR8rH6oz75sd/1fpaagHO1OvHEYhAt2U1piFpw49JA+BmQOKVaxo1Z7d8n8D
			M5PyoGC4l1qWXD4qvFVMwTiSSf3x3VdO4CY2Ax2BAoGATYQfX/vxk6v7gVr4fBQU
			jCd25kxrhQ5GZ1tvL8HND/pz3o1qu5stGAhoM7t2+w6/OxwDCBluKwYx9fcaP1tI
			vA9ebRwGmUQTojjPwQMNfbuQdD1xIq+C6fKg0cSCvRfwDQxXTsjJgpE6Qhs9LygL
			E7Tysgyd8jjH5lEj8r3qCSU=-----END PRIVATE KEY-----`
			
			
			
									// 加签
									var sign_rsa = new RSA.RSAKey();
									sign_rsa = RSA.KEYUTIL.getKey(sikey);
									var hashAlg = 'sha256';
									var hSig = sign_rsa.signString(paySign, hashAlg);
									hSig = RSA.hex2b64(hSig); // hex 转 b64
									uni.hideLoading();
									self.time = Date.now();
									wx.requestPayment({
										'appId': self.payList.appid,
										'nonceStr': self.payList.noncestr,
										'package': self.payList.package,
										'signType': 'RSA',
										'timeStamp': self.payList.timestamp,
										'paySign': hSig,
										success: function(res) {
											this.show = false;
											uni.showToast({
												title: '微信支付成功'
											});
											setTimeout(function() {
												uni.navigateTo({
													url: `/pages/order/paysuccess?id=${self.orderInfo.id}&&money=${self.orderInfo.payMoney}`
												});
											}, 600);
										},
										fail: function(err) {
											console.log(err, '错误信息')
											uni.showModal({
												title: '支付失败',
												content: '订单支付失败，请重新进行支付。如对订单金额有疑问请联系客服人员',
												showCancel: false
											})
											return
										}
									});
								} else {
									uni.hideLoading();
									uni.showModal({
										title: '支付失败',
										content: res.msg,
										showCancel: false
									})
								}
							})
						},
			// getPaypalOrder(i) {
			// 	let self = this;
			// 	let postData = {
			// 		 "client": "小程序",
			// 		  "openId": self.openId,
			// 		  "orderId": self.orderList[i].id,
			// 		  "orderNo": self.orderList[i].orderNo,
			// 		  "payMoney": self.orderList[i].payMoney,
			// 		  "payWay":1
			// 	}
				
			// 	// console.log(postData,'微信支付')
			// 	uni.showLoading({
			// 		title: '支付准备中',
			// 		mask: true
			// 	});
			// 	self.Post2('/api/pay/appletsWechatOrderPay', postData).then(res => {
			// 		if (res.code === 200) {
			// 			console.log(res,'支付')
			// 			self.payList = res.body;
			// 			uni.hideLoading();
			// 			self.time = Date.now();
						
			// 			wx.requestPayment({
			// 				'appId': self.payList.appid,
			// 				'nonceStr': self.payList.noncestr,
			// 				'package': self.payList.package,
			// 				'signType': 'MD5',
			// 				'timeStamp': self.payList.timestamp,
			// 				'paySign': self.payList.sign,
			// 				success: function(res) {
			// 					uni.showToast({
			// 						title: '微信支付成功'
			// 					});
			// 					setTimeout(function() {
			// 						uni.navigateTo({
			// 							url:`/pages/order/paysuccess?money=${self.orderList[i].payMoney}`
			// 						});
			// 					}, 600);
			// 				},
			// 				fail: function(err) {
			// 					uni.showModal({
			// 						title: '支付失败',
			// 						content: '订单支付失败，请重新进行支付。如对订单金额有疑问请联系客服人员',
			// 						showCancel: false
			// 					})
			// 					return
			// 				}
			// 			});
			// 		} else {
			// 			uni.hideLoading();
			// 			uni.showModal({
			// 				title: '支付失败',
			// 				content: res.msg,
			// 				showCancel: false
			// 			})
			// 		}
			// 	})
			// },
			getOrderDel(i, index) {
				let self = this;
				let postData = `ids=${i}`
				// console.log(id,'ddddddddddddddd')
				uni.showModal({
					title: '订单删除确认',
					content: '订单删除后不可恢复，是否继续删除？',
					success(ces) {
						if (ces.confirm) {
							// let id = self.orderList[index].id;
							uni.showLoading({
								title: '准备删除中',
								mask: true
							});
							self.Post('/api/order/delOrder', postData).then(res => {
								if (res.code === 200) {
									uni.hideLoading();
									uni.showToast({
										title: '订单删除成功'
									});
									self.orderList.splice(index, 1);
									self.getOrderList()
								} else {
									uni.hideLoading();
									uni.showModal({
										title: '订单删除失败',
										content: res.msg,
										showCancel: false
									})
								}
							})
						}
					}
				})
			},
			confirmOrder(id) {
				let self = this;
				uni.showLoading({
					title: '确认收货中',
					mask: true
				});
				self.Get(self.Url.orderConfirm, {
					id: id
				}).then(res => {
					if (res.code === 0) {
						uni.hideLoading();
						uni.showToast({
							title: '确认收货成功'
						});
						self.orderPage.page = 1;
						self.orderList = [];
						self.getOrderList();
					} else {
						uni.hideLoading();
						uni.showModal({
							title: '确认收货失败',
							content: res.msg,
							showCancel: false
						})
					}
				});
			},
			getDetailsTap(id) {
				uni.navigateTo({
					url: `/pages/order/orderDetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.head_box {
		display: flex;
		align-items: center;
		height: 120rpx;
		background-color: #fff;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 100;
		border-bottom: 3rpx solid #f5f5f5;
		.label {
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.tit {
				color: #666;
				transition: all 0.2s;
				padding-top: 6rpx;
				border-bottom: 3px solid transparent;
				padding-bottom: 10rpx;
				font-size: 30rpx;
			}
		}

		.alabel {
			.tit {
				color: #1c1c1c;
				font-weight: bold;
				border-color: #00d389;
			}
		}
	}

	.order_list_box {
		width: 100%;
		min-height: 72vh;

		.order {
			width: 100%;
			margin: 0 auto;
			border-radius: 20rpx;
			background-color: #fff;
			margin-bottom: 30rpx;
			border-bottom: 3rpx solid #f5f5f5;
			.head {
				display: flex;
				align-items: center;
				width: 92%;
				margin: 0 auto;
				height: 80rpx;
				justify-content: space-between;

				.left {
					color: #999;
					font-size: 28rpx;
					display: flex;
					align-items: center;

					span {
						background-color: #F54319;
						color: #fff;
						font-size: 24rpx;
						width: 36rpx;
						height: 36rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 6rpx;
						margin-left: 20rpx;
						line-height: 36rpx;
					}
				}
			}

			.goods_box {
				width: 92%;
				margin: 0 auto;
				background-color: #f5f5f5;
				border-radius: 20rpx;

				.goods {
					display: flex;
					align-items: center;
					padding: 20rpx 0;

					.left {
						width: 190rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 150rpx;
							height: 150rpx;
							box-sizing: border-box;
							border-radius: 20rpx;
							background-color: #fff;
						}
					}

					.right {
						flex: 1;
						min-width: 0;
						height: 150rpx;
						display: flex;
						flex-direction: column;
						box-sizing: border-box;
						justify-content: space-between;
						position: relative;
						
						.goodsSpecification {
							position: relative;
							color: #666;
							width: 95%;
							font-size: 26rpx;
							display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
							-webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
							-webkit-line-clamp: 2;  //一个块元素显示的文本的行数
							overflow: hidden; //溢出隐藏
							// .text{
								
							// }
							.num {
								position: absolute;
								bottom: -70rpx;
								left: 0;
							}
						}

						.title {
							color: #1c1c1c;
							font-size: 28rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							width: 95%;
							
						}


						.box {
							display: flex;
							align-items: center;
							justify-content: space-between;
							width: 95%;
							padding-bottom: 10rpx;

							.num {
								color: #1c1c1c;
								font-size: 30rpx;
								display: flex;
								align-items: center;

								span {
									font-size: 26rpx;
									padding-left: 2rpx;
								}
							}

							.buy {
								color: #1c1c1c;
								padding: 0 10rpx;
								border-radius: 10rpx;
							}
						}
					}
				}
			}

			.foot {
				width: 92%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 100rpx;

				.left {
					color: #1c1c1c;
					font-size: 28rpx;

					span {
						font-weight: bold;
						color: #f14b5b;
					}
				}

				.right {
					flex: 1;
					display: flex;
					justify-content: flex-end;

					.button {
						border: 1px solid #e5e5e5;
						color: #666;
						font-size: 28rpx;
						padding: 0 20rpx;
						border-radius: 100rpx;
						line-height: 28rpx;
						display: flex;
						align-items: center;
						height: 50rpx;
						position: relative;

						button {
							position: absolute;
							width: 100%;
							height: 100%;
							top: 0;
							left: 0;
							opacity: 0;
						}

						/deep/.u-count-down__text {
							font-size: 28rpx;
							color: #fff;
							padding-left: 4rpx;
						}
					}
				}
			}
		}
	}
</style>
