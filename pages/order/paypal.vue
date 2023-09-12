<template>
	<view class="content" @click="close">
		<view class="paypal_box">
			<view class="menu_box box_shadow">
				<view class="head">
					<view class="left"><span>提货方式</span></view>
					<view class="right"></view>
				</view>
				<view class="delivery_box">
					<u-radio-group v-model="logisticsType" placement="row" @change="selectOrderTap()">
						<u-radio v-for="(item, index) in delivery" :key="index" activeColor="#F54319" :name="item.id"
							:label="item.name" shape="square"></u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="menu_box box_shadow" v-if="logisticsType== 1 || logisticsType== 2">
				<view class="head">
					<view class="left"><span>收货地址</span></view>
					<view class="right">
						<span v-if="addressData"
							@click="getPathTap('/pages/user/addressEdit?id=' + addressData.id)">编辑地址</span>
						<span v-else @click="getPathTap('/pages/user/addressList?type=select')">请选择收货地址</span>
					</view>
				</view>
				<view class="address_box" @click="getPathTap('/pages/user/addressList?type=select')">
					<view v-if="addressData!==''" class="address">
						<view class="left">
							<view class="tit">
								{{ addressData.name }}
								<span>{{ addressData.mobile }}</span>
							</view>
							<view class="txt">
								{{ addressData.province }}{{ addressData.city }}{{ addressData.district }}{{ addressData.address }}
							</view>
						</view>
						<view class="right">
							<aicon type="arrow-right-s-line" size="25" color="#999"></aicon>
						</view>
					</view>
					<view v-else class="none_address">
						<aicon type="location" size="25"></aicon>
						<span>选择地址</span>
					</view>
				</view>
			</view>
			<!-- 自提 -->
			<view v-if="logisticsType == 3" class="Selfpickup"
				style="width: 100%; background-color: #fff;box-sizing: border-box;">
				<!-- <view class="uni-form-item uni-column"
					style="display: flex;justify-content: space-between;height: 90rpx;align-items: center;font-size: 28rpx;">
					<view class="title">自提联系人</view>
					<input style="flex: 1;text-align: right;" class="uni-input" v-model="selfaddress.name"
						placeholder="请输入联系人" />
				</view> -->
				<!-- <view class="uni-form-item uni-column"
					style="display: flex;justify-content: space-between;height: 90rpx;align-items: center;font-size: 28rpx;">
					<view class="title">预留电话</view>
					<input style="flex: 1;text-align: right;" class="uni-input" v-model="selfaddress.mobile"
						placeholder="请输入联系人电话" />
				</view> -->
				<view class="menu_box box_shadow">
					<view class="head">
						<view class="left">
							<span>联系电话</span>
						</view>
						<view class="right"></view>
					</view>
					<view class="phone_box">
						<view class="input">
							<input type="number" v-model="selfaddress.mobile" placeholder="请输入联系电话" />
						</view>
						<view class="btn">获取当前号码<button open-type="getPhoneNumber"
								@getphonenumber="getBindWechatPhoneTap"></button></view>
					</view>
				</view>
				<view class="uni-form-item uni-column"
					style="display: flex;justify-content: space-between;height: 90rpx;font-size: 28rpx;padding: 0 5%;">
					<view class="title">自提点</view>
					<view class="">
						<view style="font-weight: bold; text-align: right;">{{businessInfo.businessName }}</view>
						<view style="font-size: 24rpx; color:#aeb0b5;">{{ selfaddress.address }}</view>
					</view>
					<!-- <input style="flex: 1;text-align: right;" class="uni-input" focus placeholder="请输入联系人电话" /> -->
				</view>
				<!-- <view class="uni-form-item uni-column"
					style="display: flex;justify-content: space-between;height: 90rpx;align-items: center;font-size: 28rpx;">
					<view class="title">自提时间</view>
					<view class="" style="z-index: 999;">
						<uni-datetime-picker :clear-icon="false" :border="false" type="datetime" placeholder="请选择自提时间"
							@change="changeLog" />
					</view>
				</view> -->
			</view>
			<view class="menu_box box_shadow">
				<view class="head">
					<view class="left"><span>商品信息</span></view>
					<view class="right">
						<!-- 共{{cardNumTotal}}件商品 -->
					</view>
				</view>
				<view class="goods_box">
					<view class="goods" v-for="(item, index) in shopCartList" :key="index">
						<view class="left">
							<view class=""
								v-if="item.goodsSpecification.length > 0 && item.goodsSpecification[0]!=null">
								<image v-if="item.goodsSpecification[0].specificationImages!=''"
									:src="item.goodsSpecification[0].specificationImages" lazy-load="true"
									mode="aspectFill"></image>
								<!-- <image  :src="item.goodsSpecification[0].specificationImages" lazy-load="true" mode="aspectFill"></image> -->
							</view>
							<image v-if="item.previewUrl" :src="item.previewUrl" lazy-load="true" mode="aspectFill">
							</image>
							<image v-if="item.plugsGoods" :src="item.plugsGoods.previewUrl" lazy-load="true"
								mode="aspectFill"></image>
						</view>
						<view class="right">
							<view v-if="item.goodsName" class="title">{{ item.goodsName }}</view>
							<view v-else class="title">{{ item.plugsGoods.goodsName }}</view>
							<view class="goodsSpec"
								v-if="item.goodsSpecification.length > 0 && item.goodsSpecification[0]!=null">
								<view v-for="(value, key) in JSON.parse(item.goodsSpecification[0].specificationName)"
									:key="key">{{ key + ':' + value }}</view>
							</view>
							<view class="price">
								<view class="">
									<view class="num"
										v-if="item.goodsSpecification.length > 0 && item.goodsSpecification[0]!=null">
										{{ item.goodsSpecification[0].dealPrice }}
										<span>元</span>
									</view>
									<view class="num" v-else-if="item.goodsPrice">
										{{ item.goodsPrice }}
										<span>元</span>
									</view>
									<view class="num" v-else-if="item.plugsGoods">
										{{ item.plugsGoods.goodsPrice }}
										<span>元</span>
									</view>
								</view>

								<view class="buy">x{{ item.goodsNum }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="menu_box box_shadow">
				<view class="head">
					<view class="left"><span>支付信息</span></view>
					<view class="right"></view>
				</view>
				<view class="order_info_box">
					<view class="order_head">
						<view class="label">
							<view class="tit">商品合计</view>
							<view class="txt">¥{{ goodsTotal }}</view>
						</view>
					</view>
					<view class="" v-if="logisticsType == 1 || logisticsType == 2">
						<view class="order_foot">
							<view class="label">
								<view class="tit">实际应付</view>
								<view class="txt">¥{{ JSON.parse(goodsTotal) + JSON.parse(distributionFee) }}</view>
							</view>
						</view>
						<view class="order_foot">
							<view class="label">
								<view class="tit">配送费</view>
								<view class="txt">¥{{ distributionFee }}</view>
							</view>
						</view>
					</view>
					<view class="" v-if="logisticsType == 3">
						<view class="order_foot">
							<view class="label">
								<view class="tit">实际应付</view>
								<view class="txt">¥{{ JSON.parse(goodsTotal)  }}</view>
							</view>
						</view>
						<view class="order_foot">
							<view class="label">
								<view class="tit">配送费</view>
								<view class="txt">¥{{ 0 }}</view>
							</view>
						</view>
					</view>

					<view class="order_foot">
						<view class="label">
							<view class="tit">订单备注</view>
							<input type="text" v-model="ordermark"
								style="width: 76%;text-align: right;font-weight: 400;" placeholder="订单备注" />
						</view>
					</view>
					<view class="order_foot" v-if="useCouponId">
						<view class="label">
							<view class="tit">优惠金额</view>
							<view class="txt">¥{{ selectCoupon.plugsCoupons.couponDenomination }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <paypalType :paypalShow="paypalShow" :money="userData.moneys" :countDownTime="orderData.count_down_time" @close="paypalShow=false" @paypal="getPaypalOrder"></paypalType> -->
		<u-popup :show="paypalShow" mode="bottom" :round="10" @close="close()">
			<view class="showBox">
				<view class="pheader">请选择支付方式</view>
				<view class="paypalList">
					<view class="paypal" @click="getPaypalOrder()">
						<view class="paypal-left">
							<view class="left">
								<aicon type="weixin1" size="30" color="#00c250"></aicon>
							</view>
							<view class="right">
								<view class="title">微信支付</view>
								<view class="info">简单快捷，推荐使用</view>
							</view>
						</view>
						<view class="icon">
							<aicon type="unfold-copy" size="18" color="#e2e2e2"></aicon>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<view class="seat_box">
			<view class="seat"></view>
		</view>
		<view class="footer box_shadow">
			<view class="label">
				<view class="button" @click="paypalOrderTap('form')" style="backgroundColor: #F54319;">
					<span>确认下单并支付</span>
				</view>
				<!-- 	<button>确认下单并支付</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../static/utils/md5.js';
	import JSONBig from 'json-bigint';
	const app = getApp();
	export default {
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				shopInfoData: uni.getStorageSync('__ddminiShopInfo'),
				shopCartList: uni.getStorageSync('__ddminiShopCart'),
				openId: uni.getStorageSync('__ddminiUserOpenid'),
				businessId: uni.getStorageSync('__ddminiStoreInfo'),
				UserInfo: uni.getStorageSync('__ddminiUserInfo'),
				businessInfo: {},
				num: 0,
				goodsTotal: 0,
				cardNumTotal: 0,
				couponsIndex: -1,
				couponsList: [],
				addressData: '',
				addressIndex: '', // 地址下标
				orderInfo: '',
				goodsOrderList: [],
				// deliveryType: 1,
				userPhoneNumber: '',
				orderType: '',
				pintuanId: '',
				addCartInfo: [],
				list: [],
				payList: '',
				logisticsType: 2,
				goodsScoreStatus: false,
				paypalShow: false,
				time: '',
				userData: '',
				addressList: {},
				// deliveryType: 1,
				delivery: [{
					name: '快递',
					id: 2
				}],
				show2: false,
				cartListId: [], // 购物车ID列表
				couponList: [],
				useCouponId: '', // 使用优惠券ID
				selectCoupon: {}, // 选择优惠券的信息
				balanceMoney: 0, // 余额
				scoreType: '',
				integral: 0,
				appointMoney: 0,
				ordermark: '',
				distributionFee: 0,
				addressInfo: {},
				pickupTime: '',
				balanceMoney: 0,
				pickupTime: '',
				selfaddress: {
					default: true,
					address: '',
					province: '',
					city: '',
					district: '',
					latitude: 0,
					name: '自提',
					mobile: '',
					longitude: 0,
					order: 0
				},
				Timelist: []
			};
		},
		onShow() {
			let self = this;
			this.openId = uni.getStorageSync('__ddminiUserOpenid');
			let deliveryTypes = uni.getStorageSync('__deliveryType');
			if (deliveryTypes !== '') {
				self.logisticsType = deliveryTypes;
			}
			self.getuserInfo();
		},
		onLoad(e) {
			let self = this;
			self.getstoreInfo();
			let cart = self.shopCartList;
			let nums = 0;
			let mony = 0;
			let mony2 = 0;
			let goods = [];
			if (e.type) {
				self.orderType = e.type;
			}
			if (e.pintuanId) {
				self.pintuanId = e.pintuanId;
			}
			let goods3 = [];
			cart.forEach(itm => {
				nums += itm.goodsNum;

				let goods2 = [];
				let goods4 = [];
				if (itm.id != null) {
					goods3.push(itm.id);
				}
				if (itm.goodsSpecification.length > 0 & itm.goodsSpecification[0] != null) {
					mony += itm.goodsSpecification[0].dealPrice * itm.goodsNum;
					itm.goodsSpecification.forEach(itm2 => {
						goods2.push(itm2.id);
						goods4.push(itm2.specificationName);
						if (itm.ctype === 'score') {
							self.goodsScoreStatus = true;
						}
					});
				} else {
					if (itm.plugsGoods) {
						mony2 += itm.plugsGoods.goodsPrice * itm.goodsNum;
					} else if (itm.goodsPrice) {
						mony2 += itm.goodsPrice * itm.goodsNum;
					}
				}
				goods.push({
					goodsId: itm.goodsId,
					goodsNum: itm.goodsNum,
					goodsName: !itm.plugsGoods ? itm.goodsName : itm.plugsGoods.goodsName,
					goodsSpecificationIds: (goods2.toString() == '') ? 0 : goods2.toString(),
					goodsSpecificationNames: (goods4.toString() == '') ? 0 : goods4.toString()
				});
			});
			let mony3 = mony + mony2;
			self.cardNumTotal = nums;
			self.goodsTotal = mony3.toFixed(2);
			self.goodsOrderList = goods;
			self.cartListId = goods3;
			uni.$on('selectAddress', function(data) {
				if (data != null) {
					self.addressIndex = data;
					self.getAddressList()
					// console.log(self.addressIndex, 'pppppppppppppppp')
				} else {
					// self.getAddressList(self.addressIndex);
				}
			});
			self.getcouponList();
		},
		methods: {
			getNowTime() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hour = date.getHours();
				let minute = date.getMinutes();
				let second = date.getSeconds();
				let time = year + '-' + this.addZero(month) + '-' + this.addZero(day) + ' ' + this.addZero(
					hour) + ':' + this.addZero(minute) + ':' + this.addZero(second);
				return time;
			},
			addZero(s) {
				return s < 10 ? ('0' + s) : s;
			},
			getPhone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			openMap(lon, lat) {
				uni.getLocation({
					success: res => {
						// res.latitude=lat;
						// res.longitude=lon;
						// console.log('location success', parseFloat(lat), parseFloat(lon))
						uni.openLocation({
							latitude: parseFloat(lat),
							longitude: parseFloat(lon),
							scale: 18
						})
					}
				})
			},
			getuserInfo() {
				let self = this;
				let id = self.UserInfo.id
				self.Get('/api/user/searchUserInfoById', {
					userId: id
				}).then(res => {
					if (res.code == 200) {
						self.userInfo = res.body;
						self.balanceMoney = res.body.balance;
						self.integral = res.body.integral;
					}
				})
			},
			selectOrderTap(e) {
				this.logisticsType = e;
			},
			changeLog(e) {
				this.pickupTime = e;
			},

			getstoreInfo() {
				let self = this;
				this.Get('/api/plugs/getBusinessInfoById', {
					businessId: this.businessId
				}).then(res => {
					if (res.code == 200) {
						let jsondata = JSON.parse(res.body.jsonData);
						this.businessInfo = JSON.parse(res.body.jsonData);
						this.selfaddress.address = this.businessInfo.businessAddress.address;
						this.selfaddress.city = this.businessInfo.businessAddress.city;
						this.selfaddress.district = this.businessInfo.businessAddress.district;
						this.selfaddress.latitude = this.businessInfo.businessAddress.latitude;
						this.selfaddress.longitude = this.businessInfo.businessAddress.longitude;
						this.selfaddress.province = this.businessInfo.businessAddress.province;
						let cart = this.shopCartList;
						let expressMoney = 0;
						if (jsondata.shopExpressFee.allShopExpressFeeAccumulateORNot) {
							if (jsondata.shopExpressFee.allShopExpressFeeAccumulateORNot == 1) {
								cart.forEach(itm => {
									expressMoney += itm.distributionFee;
								});
							} else {
								expressMoney = jsondata.shopExpressFee.allShopExpressFee;
							}
						} else {
							expressMoney = jsondata.shopExpressFee.allShopExpressFee;
						}
						this.distributionFee = expressMoney;
						let list = jsondata.businessHours;
						let listArr = [];
						list.forEach(item => {
							let data = this.checkAuditTime(item.businessStartTime, item.businessEndTime);
							listArr.push(data)
						})
						this.Timelist = listArr.filter(item => item == true);
						this.getAddressList();
						// this.goodsTotal=JSON.parse(this.goodsTotal)+ JSON.parse(this.distributionFee);
						// console.log(this.goodsTotal, '运费888888555555555');
					}
				});
			},
			getcouponList() {
				let self = this;
				let postdata = {
					businessId: self.businessId,
					status: 0
				};
				self.Get('/api/plugs/searchPlugsCouponsByUserId', postdata).then(res => {
					if (res.code == 200) {
						self.couponList = res.body.list;
						let list = res.body.list;
						let list2 = list.filter(item => item.plugsCoupons.goodsType == 2);
						let str = '';
						if (list2.length == 1) {
							str = list2[0].plugsCoupons.goodsIds;
						} else if (list2.length > 1) {
							list2.forEach(item => {
								str = item.join(',');
							});
						}
						let str2 = JSON.stringify(str);
						let list3 = self.shopCartList.filter(item => str2.includes(item.goodsId));
						let mony = 0;
						list3.forEach(itm => {
							mony += itm.goodsSpecification[0].dealPrice * itm.goodsNum;
						});
						self.appointMoney = mony;
					}
				});
			},

			close() {
				this.paypalShow = false;
			},
			getAddressList() {
				let self = this;
				let id = uni.getStorageSync('__ddminiUserInfo').id;
				let i = self.addressIndex;
				self.Get('/api/user/searchUserInfoById', {
					userId: id
				}).then(res => {
					if (res.code == 200) {
						let list = res.body.receiveAddressJson;
						if (list != undefined) {
							let list2 = JSON.parse(res.body.receiveAddressJson);
							console.log(list2, '123123123123123')
							if (list2.length > 0) {
								let list3 = list2.filter(item => item.default == true);
								if (i !== '') {
									self.addressList = list2[i];
								} else {
									if (list3.length > 0) {
										self.addressList = list3[0]
									} else {
										self.addressList = list2[0]
									}
								}
								// console.log(self.addressList, '默认地址111111111111')
								if (self.addressList) {
									self.addressData = self.addressList;
									let postData = {
										latitude: self.addressData.latitude,
										logisticsType: this.logisticsType,
										longitude: self.addressData.longitude,
										payMoney: 0,
										businessId: self.businessId,
										orderGoodsDTOS: self.goodsOrderList,
										receiverAddress: JSON.stringify(self.addressData),
										shopCartIds: self.cartListId,
										userCouponId: self.selectCoupon.id,
										orderRemark: self.ordermark,
										areaCode: self.addressData.areaCode
									};
									self.Post2('/api/platform/getShippingFeeEstimate', postData).then(res => {
										if (res.code == 200) {
											self.distributionFee = res.body;
										}
									});
									let acc = this.space(self.businessInfo.businessAddress.latitude, self
										.businessInfo
										.businessAddress.longitude, self.addressData.latitude, self.addressData
										.longitude)
									console.log(acc.toFixed(), 778);
									this.num = acc.toFixed(2) * 1000
									// console.log(this.num,'距离8888888888888');
								}
							} else {
								self.addressData = ''
							}
						}
					}
				});
			},

			space(lat1, lng1, lat2, lng2) {
				console.log(lat1, lng1, lat2, lng2)
				var radLat1 = lat1 * Math.PI / 180.0;
				var radLat2 = lat2 * Math.PI / 180.0;
				var a = radLat1 - radLat2;
				var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
				var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
				s = s * 6378.137;
				s = Math.round(s * 10000) / 10000;
				return s // 单位千米
			},

			selectCouponsTap(index) {
				let self = this;
				if (index === self.couponsIndex) {
					self.couponsIndex = -1;
				} else {
					self.couponsIndex = index;
				}
				self.paypalOrderTap();
			},
			paypalOrderTap(e) {
				let self = this;
				// if(self.Timelist.length==0){
				// 	uni.showModal({
				// 		title: '订单提示',
				// 		content: '当前店铺已休息',
				// 		success(res) {}
				// 	});
				// 	return
				// }
				uni.showLoading({
					title: '订单准备中',
					mask: true
				});
				if (self.logisticsType == 3) {
					if (!self.selfaddress.name) {
						uni.showModal({
							title: '订单提示',
							content: '请输入姓名',
							success(res) {}
						});
						uni.hideLoading();
						return;
					} else if (!self.selfaddress.mobile) {
						uni.showModal({
							title: '订单提示',
							content: '请输入联系电话',
							success(res) {}
						});
						uni.hideLoading();
						return;
					} else if (!/^1[3456789]\d{9}$/.test(self.selfaddress.mobile)) {
						uni.showModal({
							title: '手机格式错误',
							content: '请输入正确的手机号码',
							success(res) {}
						});
						uni.hideLoading();
						return;
					}
					// else if (!self.pickupTime) {
					// 	uni.showModal({
					// 		title: '订单提示',
					// 		content: '请输入自提时间!',
					// 		showCancel: false
					// 	});
					// 	uni.hideLoading();
					// 	return;
					// }
				} else if (self.logisticsType == 1 || self.logisticsType == 2) {
					if (!self.addressData) {
						uni.showModal({
							title: '订单提示',
							content: '还没有收货地址，请先选择或添加收货地址！',
							confirmText: '选择地址',
							success(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/user/addressList?type=select'
									});
								}
							}
						});
						uni.hideLoading();
						return;
					}
					// else if (JSON.parse(self.goodsTotal)  < JSON.parse(self.businessInfo.shopExpressFee.orderStartMoney) ) {
					// 	uni.showModal({
					// 		title: '订单提示',
					// 		content: '订单金额小于起送金额，起送金额为' + self.businessInfo.shopExpressFee.orderStartMoney + '元',
					// 		showCancel: false
					// 	});
					// 	uni.hideLoading();
					// 	return;
					// } 
					// else if (self.num > JSON.parse(self.businessInfo.shopExpressFee.maxDeliveryDistance) ) {
					// 	uni.showModal({
					// 		title: '订单提示',
					// 		content: '下单距离大于配送距离，配送距离为' + self.businessInfo.shopExpressFee.maxDeliveryDistance +
					// 			'米',
					// 		showCancel: false
					// 	});
					// 	uni.hideLoading();
					// 	return;
					// }
				}


				let postData = {
					latitude: 0,
					logisticsType: this.logisticsType,
					longitude: 0,
					payMoney: 0,
					businessId: self.businessId,
					orderGoodsDTOS: self.goodsOrderList,
					receiverAddress: '',
					shopCartIds: self.cartListId,
					userCouponId: self.selectCoupon.id,
					orderRemark: self.ordermark,
					areaCode: 0
				};
				if (this.logisticsType == 2 && self.addressData.areaCode) {
					postData.areaCode = self.addressData.areaCode
					postData.latitude = self.addressData.latitude
					postData.longitude = self.addressData.longitude
				}
				if (self.logisticsType == 2) {
					postData.receiverAddress = JSON.stringify(self.addressData);
					postData.payMoney = JSON.parse(self.goodsTotal) + JSON.parse(self.distributionFee);
				} else if (self.logisticsType == 3) {
					postData.receiverAddress = JSON.stringify(self.selfaddress);
					postData.payMoney = JSON.parse(self.goodsTotal);
					let time = this.getNowTime();
					postData.expectPickTime = time;
					// postData.expectPickTime = self.pickupTime;
				}
				console.log(postData);
				self.Post2('/api/order/createOrder', postData).then(res => {
					uni.hideLoading();
					if (res.code === 200) {
						self.orderInfo = res.body;

						let id = JSONBig.stringify(self.orderInfo.id);
						uni.$emit('addshopcart', id)
						// console.log(id,'订单ID')
						if (!self.goodsScoreStatus) {
							self.paypalShow = true;
						}
					} else {
						uni.showModal({
							title: '订单提示',
							content: res.msg,
							showCancel: false
						});
						return;
					}
				});
			},
			getPaypalOrder() {
				let self = this;
				let postData = {
					client: '小程序',
					openId: self.openId,
					orderId: self.orderInfo.id,
					orderNo: self.orderInfo.orderNo,
					payMoney: self.orderInfo.payMoney,
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
			// 余额支付
			balancePay() {
				let self = this;
				if (self.balanceMoney < self.orderInfo.payMoney) {
					uni.showModal({
						title: '提示',
						content: '余额不足,请充值',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/index/membercz'
								})
							} else if (res.cancel) {}
						}
					});
				}
				let postdata = {
					"client": "小程序",
					"extParm": "",
					"openId": self.openId,
					"orderId": self.orderInfo.id,
					"orderNo": self.orderInfo.orderNo,
					"payMoney": self.orderInfo.payMoney,
					"payType": 0,
					"payWay": 4
				}
				uni.showLoading({
					title: '支付准备中',
					mask: true
				});
				self.Post2('/api/pay/balanceOrderPay', postdata).then(res => {
					if (res.code == 200) {
						uni.hideLoading();
						uni.showToast({
							title: '微信支付成功'
						});
						setTimeout(function() {
							let id = JSON.parse(JSON.stringify(self.orderInfo.id));
							uni.navigateTo({
								url: `/pages/order/paysuccess?id=${id}&&money=${self.orderInfo.payMoney}`
							});
						}, 600);
					} else {
						uni.hideLoading();
						uni.showToast({
							title: res.msg
						});
					}
				})
			},
			getBindWechatPhoneTap(e) {
				let self = this;
				let postdata = {
					id: 35
				}
				self.Get('/api/admin/searchAdminUserById', postdata).then(res => {
					if (res.code == 200) {
						self.weCahtInfo = JSON.parse(res.body.configJson)
					}
				})
				uni.login({
					provider: "weixin",
					success(les) {
						uni.request({
							url: 'https://api.weixin.qq.com/sns/jscode2session',
							method: 'GET',
							data: {
								appid: self.weCahtInfo.weiXinConfig.x_appid, //你的小程序的APPID  
								secret: self.weCahtInfo.weiXinConfig.x_secret, //你的小程序的secret,  
								js_code: les.code, //wx.login 登录成功后的code  
								grant_type: 'authorization_code',
							},
							success: (cts) => {
								let wechatServerJSON = {
									iv: e.detail.iv,
									sessionKey: cts.data.session_key,
									encryptedData: e.detail.encryptedData,
								}
								let data = {
									wechatServerJSON: JSON.stringify(wechatServerJSON)
								}
								self.Get('/api/oauth/getWeChartUserPhone', data).then(res => {
									if (res.code === 200) {
										self.selfaddress.mobile = res.body.phoneNumber;
										console.log(res, '号码666')
									}

								})
							}
						});
					}
				})
			},
			getPathTap(path) {
				uni.navigateTo({
					url: path
				});
			}
		}
	};
</script>

<style lang="less">
	.content {
		padding-bottom: 120rpx;
	}

	// 优惠券样式
	.couponBox {
		width: 94%;
		height: 180rpx;
		margin: auto;
		margin-bottom: 12rpx;
		// border-radius: 8rpx;
		display: flex;
		border: 3rpx solid #e6b4b6;

		.couponBox-left {
			width: 180rpx;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			padding-bottom: 20rpx;
			border-right: 3rpx solid #f5f5f5;

			.limituse {
				width: 100%;
				text-align: center;
				padding: 6rpx 0;
				font-size: 24rpx;
				background-color: #fad8d8;
				color: #d75057;
			}

			.couponMoney {
				color: #d75057;
				font-weight: 600;
				font-size: 42rpx;
			}
		}

		.couponBox-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-around;
			// align-items: center;
			padding: 16rpx 26rpx;
			box-sizing: border-box;

			.couponName {
				display: flex;
				font-weight: bold;
			}

			.limitTime {
				font-size: 24rpx;
				color: #aaa;
			}

			.couponExplain {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.couponExplain-right {
					width: 160rpx;
					height: 60rpx;
					border-radius: 40rpx;
					text-align: center;
					line-height: 60rpx;
					background-color: #fad8d8;
					color: #d8696f;
				}
			}
		}
	}

	.showBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 40rpx;

		.pheader {}

		.paypalList {
			width: 94%;

			margin: 30rpx 0 260rpx 0;

			.paypal {
				width: 80%;
				margin: auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.paypal-left {
					display: flex;
					align-items: center;

					.right {
						margin-left: 26rpx;
					}
				}
			}
		}
	}

	.menu_box {
		width: 100%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 10rpx;

		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100rpx;
			width: 90%;
			margin: 0 auto;

			.left {
				color: #1c1c1c;
				font-size: 30rpx;
				font-weight: bold;
				line-height: 30rpx;
				display: flex;
				align-items: center;
			}

			.right {
				color: #999;
				display: flex;
				align-items: center;
				font-size: 26rpx;
				line-height: 26rpx;
			}
		}

		.delivery_box {
			width: 90%;
			margin: 0 auto;
			padding: 10rpx 0 50rpx;
			display: flex;

			/deep/.u-radio {
				flex: 1;
			}
		}

		.phone_box {
			width: 90%;
			margin: 0 auto;
			padding: 10rpx 0 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;

			.input {
				flex: 1;
				height: 70rpx;
				border: 1px solid #eee;
				border-radius: 10rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				input {
					width: 92%;
					color: #1c1c1c;
					font-size: 30rpx;
					height: 100%;
				}
			}

			.btn {
				color: #f54319;
				border: 1px solid #f54319;
				height: 70rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 0 20rpx;
				font-size: 28rpx;
				border-radius: 10rpx;
				margin-left: 20rpx;
				position: relative;

				button {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					opacity: 0;
				}
			}
		}

		.address_box {
			width: 90%;
			margin: 0 auto;
			padding-bottom: 30rpx;

			.address {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					flex: 1;
					min-width: 0;

					.tit {
						color: #1c1c1c;
						font-size: 32rpx;

						span {
							color: #666;
							padding-left: 20rpx;
							font-size: 28rpx;
						}
					}

					.txt {
						font-size: 28rpx;
						color: #666;
						padding-top: 10rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.right {
					width: 80rpx;
					display: flex;
					align-items: center;
					justify-content: flex-end;
				}
			}

			.none_address {
				width: 100%;
				height: 150rpx;
				border: 1px dashed #e5e5e5;
				border-radius: 10rpx;
				color: #bbb;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				span {
					font-size: 26rpx;
				}
			}
		}

		.goods_box {
			padding-bottom: 2rpx;

			.goods {
				width: 90%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 40rpx;

				.left {
					width: 200rpx;

					image {
						width: 180rpx;
						height: 180rpx;
						border-radius: 20rpx;
					}
				}

				.right {
					flex: 1;
					min-width: 0;
					height: 170rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.goodsSpec {
						font-size: 24rpx;
						color: #999;
						display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
						-webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
						-webkit-line-clamp: 3; //一个块元素显示的文本的行数
						overflow: hidden; //溢出隐藏
					}

					.title {
						color: #1c1c1c;
						font-size: 30rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.text {
						color: #999;
						font-size: 28rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.price {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.num {
							color: #f14b5b;
							font-size: 32rpx;
							font-weight: bold;
							display: flex;
							align-items: center;

							span {
								font-size: 28rpx;
								padding-left: 2rpx;
							}
						}

						.buy {
							color: #f54319;
							// padding: 0 10rpx;
							border-radius: 10rpx;
							font-size: 28rpx;
							font-weight: bold;
						}
					}
				}
			}
		}

		.coupons_box {
			padding: 0 0 20rpx;

			.label {
				width: 90%;
				height: 120rpx;
				margin: 0 auto;
				border: 1px solid #f5f5f5;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20rpx;

				.price {
					width: 150rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #f14b5b;
					font-size: 38rpx;
					font-weight: bold;
					line-height: 38rpx;

					span {
						font-size: 24rpx;
						padding-left: 2rpx;
						margin-bottom: -4rpx;
					}
				}

				.info {
					flex: 1;
					min-width: 0;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.title {
						color: #1c1c1c;
						font-size: 30rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.text {
						font-size: 26rpx;
						color: #999;
						padding-top: 4rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.button {
					width: 110rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		.order_info_box {
			.order_head {
				width: 90%;
				margin: 0 auto;

				.label {
					display: flex;
					align-items: center;
					padding-bottom: 30rpx;
					justify-content: space-between;
					font-size: 28rpx;
					color: #999;
				}
			}

			.order_foot {
				border-top: 1px solid #f5f5f5;

				.label {
					display: flex;
					align-items: center;
					width: 90%;
					margin: 0 auto;
					justify-content: space-between;
					height: 90rpx;
					font-weight: bold;
					font-size: 30rpx;
				}
			}
		}
	}

	.pay_type_box {
		width: 92%;
		margin: 0 auto;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		height: 100rpx;

		.icons {
			width: 100rpx;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.title {
			flex: 1;
			color: #1c1c1c;
			font-size: 28rpx;
		}

		.right {
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	}

	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 100;
		background-color: #fff;
		padding-bottom: env(safe-area-inset-bottom);
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;

		.label {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 120rpx;
			width: 100%;

			.button {
				width: 92%;
				margin: 0 auto;
				height: 80rpx;
				border-radius: 100rpx;
				color: #fff;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f54319;

				/deep/.u-count-down__text {
					color: #fff;
					line-height: 30rpx;
					padding: 0 4rpx;
				}
			}
		}
	}
</style>