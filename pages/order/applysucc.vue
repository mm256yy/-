<template>
	<view class="content">
		<view class="content">
			<view class="payTop"></view>
			<view class="payBox">
				<!-- <image src="../../static/images/success.png" style="width: 360rpx;height: 360rpx;" mode="aspectFill"> -->
				<!-- <u-icon  name="checkmark-circle-fill" color="#ff5d32" size="50"></u-icon> -->
				<image :src="payImg" mode="aspectFill" style="width: 200rpx;height: 200rpx;" ></image>
				
				<view class="successText">退款申请,已提交成功！</view>
				<view class="pay-money">
					商家通过审核后,会自动退还到您支付账户！
				</view>
				<view class="seeOrde common" v-if="id!==''" @click="Topath()">
					查看订单
				</view>
				<view class="backHome common" @click="Tohome()">
					返回首页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import JSONBig from 'json-bigint'
	export default{
		data(){
			return{
				paytotalmoney:'',
				id:'',
				businessId: uni.getStorageSync('__ddminiStoreInfo'),
				payImg:''
			}
		},
		onLoad(e) {
			let self=this;
			self.paytotalmoney=e.money;
			// self.id=JSONBig.stringify(JSON.stringify(e.id));
			// console.log(e,'订单成功')
			self.getImg()
		},
		onShow() {
			
		},
		methods:{
			Topath(route) {
				uni.navigateTo({
					url: route
				})
			},
			Tohome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			getImg() {
				let self = this;
				self.Get(`/api/plugs/searchPlugsRecommendedList?businessId=${self.businessId}&userServiceToken=
				T2UZ8Z79OFNYZ962F85XH`).then(res => {
					if (res.code == 200) {
						let list = res.body.list;
						let url= list.filter(itm => itm.type === 'apply');
						self.payImg=url[0].activityImgUrl;
					}
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f5f5f5;
	}
	
	.payTop {
		width: 100%;
		height: 240rpx;
		// background-color:#ff5e31 ;
		background-image: linear-gradient( #ff5e31, #ff835d, #ffb6a0);
		border-radius: 0 0 100rpx 100rpx;
	}
	
	.payBox {
		width: 92%;
		height: 1000rpx;
		// padding-bottom: 200rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin: 0 auto;
		margin-top: -160rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	
		.successText {
			font-size: 36rpx;
			font-weight: bold;
			color: #ff5e31;
			margin: 40rpx 0;
		}
	
		.pay-money {
			font-size: 30rpx;
			// margin-top: 40rpx;
			margin: 40rpx 0 240rpx 0;
		}
	
		.common {
			width: 84%;
			height: 100rpx;
			border-radius: 50rpx;
			text-align: center;
			line-height: 100rpx;
			font-size: 30rpx;
		}
	
		.seeOrde {
			background-image: linear-gradient(to right, #ff5e31, #ff835d, #ffb6a0);
			color: #f5f5f5;
			margin: 0 0 40rpx 0;
			// margin-bottom: 30rpx;
		}
	
		.backHome {
			border: 3rpx solid #ff5e31;
			color: #ff5e31;
		}
	}
</style>