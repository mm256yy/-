<template>
	<view class="content">
		<block >
			<view class="headerBox">
				<view class="logo">
					<image src="../static/images/conLogo.png"></image>
					<view  class="title">大川长风</view>
				</view>
				<view class="text" style="color: #00a9f4;" >
					<text></text><span>为用户提供跨平台的定制解决方案</span>
				</view>
			</view>
			<view class="infoBox">
				<view class="title">开通&定制专属小程序</view>
				<view class="text">请联系您的专属客服</view>
				<view  class="number" @click="getPhoneTap('17505713130')"
					>
					17505713130
				</view>
			</view>
			
			<view class="button_box"  @click="getMiniTap()">免费定制小程序
			</view>
		</block>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				businessId:uni.getStorageSync('__ddminiStoreInfo'),
				qrcodeList: [],
				brandInfo: ''
			}
		},
		onLoad() {
			let self = this;
			// self.Get(
			// 	`/api/plugs/getApplicationPlugsRecommendedList?businessId=${self.businessId}&userServiceToken=T2UZ8Z79OFNYZ962F85XH`
			// ).then(res => {
			// 	if (res.code == 200) {
			// 		let list = res.body;
			// 		let data = list.filter(itm => itm.type === 'companyLogo');
			// 		self.brandInfo=data[0]
			// 		console.log(data,'公司数据')
					
			// 	}
			// })
		},
		// onShareAppMessage() {
		// 	let self = this;
		// 	return {
		// 		title: `${self.brandInfo.mini_title}-${self.brandInfo.mini_intro}`,
		// 		path: '/pages/about',
		// 	}
		// },
		// onShareTimeline() {
		// 	let self = this;
		// 	return {
		// 		title: `${self.brandInfo.mini_title}-${self.brandInfo.mini_intro}`,
		// 		imageUrl: self.brandInfo.mini_logo
		// 	}
		// },
		methods: {
			getPhoneTap(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			getCopyTap(text) {
				uni.setClipboardData({
					data: text,
					success: function() {}
				});
			},
			getMiniTap() {
				uni.navigateToMiniProgram({
					appId: 'wx86819f8a02fc11ab'
				})
			}
		}
	}
</script>

<style lang="less">
	.headerBox {
		width: 100%;
		height: 290rpx;
		background-color: #00a9f4;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logo {
			display: flex;
			align-items: center;
			width: 85%;
			margin: 0 auto;
			justify-content: center;
			flex-direction: column;

			image {
				width: 70rpx;
				height: 70rpx;
			}

			.title {
				color: #fff;
				font-size: 38rpx;
				font-weight: bold;
				padding-top: 20rpx;
			}
		}

		.text {
			color: #FFFFFF;
			font-size: 26rpx;
			background-color: rgba(255, 255, 255, 1);
			max-width: 600rpx;
			margin: 0 auto;
			height: 66rpx;
			border-radius: 100rpx;
			margin-top: 36rpx;
			line-height: 66rpx;
			box-shadow: 0 0 10rpx rgba(0, 0, 0, .05);
			position: relative;
			padding: 0 20rpx;

			span {
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			text {
				border-left: 20rpx solid transparent;
				border-right: 20rpx solid transparent;
				border-bottom: 20rpx solid rgba(255, 255, 255, 1);
				position: absolute;
				top: -20rpx;
				left: 0;
				right: 0;
				width: 0;
				height: 0;
				margin: 0 auto;
			}
		}
	}

	.infoBox {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 50rpx;

		.title {
			font-weight: bold;
			font-size: 38rpx;
			color: #222;
		}

		.text {
			color: #999;
			font-size: 28rpx;
			padding-top: 10rpx;
		}

		.number {
			color: #00a9f4;
			font-size: 52rpx;
			font-weight: bold;
			// border: 1px solid #6ec0f2;
			width: 420rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100rpx;
			margin-top: 30rpx;
		}

		.intro {
			width: 400rpx;
			background-color: rgba(0, 169, 244, .1);
			margin-top: 30rpx;
			padding: 12rpx 0;
			border-radius: 6rpx;

			.tit {
				font-size: 24rpx;
				text-align: center;
			}

			.num {
				font-size: 48rpx;
				text-align: center;
			}
		}
	}

	.qrcode {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60rpx;
		padding-bottom: 30rpx;

		.label {
			width: 250rpx;
			background-color: rgba(0, 169, 244, .1);
			border: 1px solid rgba(0, 169, 244, .3);
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: 30rpx 0;
			border-radius: 6rpx;

			image {
				width: 200rpx;
				height: 200rpx;
			}

			.text {
				color: #222;
				font-size: 24rpx;
				padding-top: 20rpx;
			}
		}
	}

	.button_box {
		width: 60%;
		height: 80rpx;
		background-color: #009DFF;
		color: #fff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 100rpx;
		margin: 0 auto;
		margin-top: 30rpx;
	}
</style>
