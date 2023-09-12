<template>
	<view class="power" @click="Topath">
		<view  class="logo">
			<image src="../../static/images/conLogo.png"></image>
			<text>大川长风</text>
		</view>
		<view class="text">提供技术与平台服务</view>
		<view class="text">v{{version}}</view>
	</view>
</template>

<script>
	export default {
		name: 'about',
		props: {},
		data() {
			return {
				brandInfo: '',
				businessId:uni.getStorageSync('__ddminiStoreInfo') || 0 ,
				version: uni.getAccountInfoSync().miniProgram.version ? uni.getAccountInfoSync().miniProgram.version :
					'1.0.0',
			}
		},
		onReady() {
			let self = this;
		},
		methods: {
			Topath(){
				uni.navigateTo({
					url:'/pages/about'
				})
			}
		}
	}
</script>

<style lang="less">
	.power {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 40rpx;

		.logo {
			display: flex;
			align-items: center;
			color: #ccc;

			image {
				width: 36rpx;
				height: 36rpx;
				filter: brightness(80%);
				opacity: .5;
			}

			text {
				padding-left: 6rpx;
			}
		}

		.text {
			color: #ccc;
			font-size: 24rpx;
		}
	}
</style>
