<template>
	<view class="content" style="background-color: white;">
		<!-- 	<view class="login-top"
			:style="{backgroundImage: 'url('+imageURL+')', 'background-repeat':'no-repeat', backgroundSize:'100% 100%'}"> -->
		<view class="login-top">
			<view class="login">
<!-- 				<template v-if="ddminiUserInfo.accessToken == null">
					<view class="login-left">
						<image class="avatar" src="../../static/images/avatar.png" mode=""></image>
						<view class="login-now" @tap="Topath('/pages/user/login')">
							立即登录
						</view>
					</view>
				</template>
				<template v-else>
					<view class="login-left">
						<image class="avatar" :src="userInfo.headImg" mode="aspectFill"></image>
						<view >
							<view>{{userInfo.userName}}</view>
							<view class="text">UID:{{userInfo.id}}</view>
						</view>
					</view>
				</template> -->
			<view v-if="ddminiUserInfo.accessToken" class="user_box">
				<view class="avatar">
					<image :src="userInfo.headImg" mode="aspectFill"></image>
					<view class="edit">
						<aicon type="camerafill" size="14" color="#fff"></aicon>
					</view>
					<button open-type="chooseAvatar" @chooseavatar="chooseavatar"></button>
				</view>
				<view class="info">
					<view class="name">
						<block v-if="!editNameStatus">
							<view class="tit">{{userNickName}}</view>
							<view class="edit" @click="editNameStatus=true">
								<aicon type="post" size="18" color="#fff"></aicon>
							</view>
						</block>
						<block v-else>
							<input type="nickname" :value="userNickName" confirm-type="send" @confirm="updatenickname"/>
						</block>
					</view>
					<view class="text">UID:{{userInfo.id}}</view>
				</view>
			</view>
			<view v-else class="user_box" @click="Topath('/pages/user/login')">
				<view class="avatar">
					<image src="../../static/images/avatar.png" mode="aspectFill"></image>
				</view>
				<view class="info">
					<view class="name">
						<view class="tit">{{userNickName}}</view>
					</view>
					<view class="text">您还未登录哦～</view>
				</view>
			</view>
			
			
			
			
				<!-- <view class="login-right" @click="Topath('/pages/user/addressList')">
					<u-icon name="map" color="#fff" size="18"></u-icon>
					<view>
						收货地址
					</view>
				</view> -->
			</view>
			<!-- <view class="collect order">
				<u-grid :border="false" col="5">
					<u-grid-item v-for="(item,index) in orderIcon" :key="index" @click="Topath(`/pages/order/order?id=${index}`)">
						<image class="grid-img" style="width: 60rpx;height: 60rpx;" :src="item.img" lazy-load="true"
							mode=""></image>
						<text class="grid-text">{{item.title}}</text>
					</u-grid-item>
				</u-grid>
			</view> -->
		</view>
		<view class="order common">
			<view class="order-title">
				<view class="my-order">我的订单</view>
				<view class="more" @click="get_nat('/pages/order/order')" >
					查看更多
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<u-grid :border="false" col="5">
				<u-grid-item v-for="(item,index) in orderIcon" :key="index" @click="TopathF(index)">
					<view class="gridBox"  >
						<image class="grid-img" style="width: 60rpx;height: 60rpx;" :src="item.img" lazy-load="true"
							mode=""></image>
					</view>
					<text class="grid-text">{{item.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="common" style="margin-top: 20rpx;padding:20rpx 0;box-sizing: border-box;">
			<view class="address" @click="get_nat('/pages/user/addressList')">
				<view class="myserver">
					<u-icon name="map-fill" size="25" color="#000"></u-icon>
					<view class="mytitle">
						我的地址
					</view>
				</view>
				<u-icon name="arrow-right" size="18" color="#000"></u-icon>
			</view>
			<view class="address" @click="get_nat('/pages/user/footmark')">
				<view class="myserver">
					<u-icon name="calendar-fill" size="25" color="#000"></u-icon>
					<view class="mytitle">
						申请开票
					</view>
				</view>
				<u-icon name="arrow-right" size="18" color="#000"></u-icon>
			</view>
			<view class="address" @click="get_nat('/pages/user/collect')">
				<view class="myserver">
					<u-icon name="heart-fill" size="25" color="#000"></u-icon>
					<view class="mytitle">
						我的收藏
					</view>
				</view>
				<u-icon name="arrow-right" size="18" color="#000"></u-icon>
			</view>
			<view class="address">
				<view class="myserver">
					<u-icon name="server-man" size="25" color="#000"></u-icon>
					<button class="contactBtn mytitle" plain="true" open-type="contact">
						联系客服
					</button>
				</view>
				<u-icon name="arrow-right" size="18" color="#000"></u-icon>
			</view>
			<view class="address" @click="get_nat('/pages/user/distribution')">
				<view class="myserver">
					<image class="remove-img" src="../../static/images/fenxiao2.png" mode=""></image>
					<!-- <u-icon name="server-man" size="18" color="#000"></u-icon> -->
					<view class="contactBtn mytitle">分销收益</view>
				</view>
				<view>
					<u-icon name="arrow-right" size="18"  color="#000"></u-icon>
				</view>
			</view>
<!-- 			<view class="address" @click="ClearStorget()">
				<view class="myserver">
					<image class="remove-img" src="../../static/images/remove.png" mode=""></image>
					<view class="contactBtn mytitle">清除缓存</view>
				</view>
				<view>
					<u-icon name="arrow-right" size="18"  color="#000"></u-icon>
				</view>
			</view> -->
		</view>
		
<!-- 		<view class="menu common">
			<view class="menu-title">
				菜单栏
			</view>
			<view class="removeStorge" @click="get_nat('/pages/user/distribution')">
				<view class="removeStorge-left">
					<image class="remove-img" src="../../static/images/fenxiao2.png" mode=""></image>
					<view class="remove-text">分销收益</view>
				</view>
				<view>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
			<view class="removeStorge" @click="ClearStorget()">
				<view class="removeStorge-left">
					<image class="remove-img" src="../../static/images/remove.png" mode=""></image>
					<view class="remove-text">清除缓存</view>
				</view>
				<view>
					<u-icon name="arrow-right" size="14"></u-icon>
				</view>
			</view>
		</view> -->
		<view class="" style="margin-top: 70rpx;" >
			<about></about>
		</view>
		<tabbar :current="3"></tabbar>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				orderIcon: [
				{
					img: '../../static/images/oderIcon/fukuan.png',
					title: '待付款'
				}, {
					img: '../../static/images/oderIcon/fahuo.png',
					title: '待发货'
				}, {
					img: '../../static/images/oderIcon/shuohuo.png',
					title: '待收货'
				}, {
					img: '../../static/images/oderIcon/wan.png',
					title: '已完成'
				},{img: '../../static/images/oderIcon/shouhou.png',
					title: '售后/退款'
				}],
				wxCode: '',
				ddminiUserInfo:'',
				userInfo:'',
				userNickName: '微信用户',
				editNameStatus: false,
			}
		},
		onLoad() {
			// console.log("__ddminiUserInfo", JSON.stringify(this.ddminiUserInfo))
		},
		
		onShow() {
			let self=this;
			self.ddminiUserInfo = uni.getStorageSync('__ddminiUserInfo');
			if(self.ddminiUserInfo.accessToken!=null){
				self.getInfo();
			}
		},

		onShareAppMessage() {
			let shop = uni.getStorageSync('__ddminiShopInfo');
			return {
				title: shop.shop_share_title || shop.shop_name,
				imageUrl: shop.shop_share_pic || shop.shop_logo,
				path: 'pages/index/index'
			}
		},
		methods: {
			get_nat(path){
				const self = this
				
				if(self.ddminiUserInfo.accessToken == null){
					uni.showToast({
						title:"请先登录!"
					})
				}else{
					uni.navigateTo({
						url:path
					})
				}
				
			},
			ClearStorget() {
				let self=this;
				uni.showModal({
					title: '提示',
					content: '确定要清除缓存吗?',
					success: function(res) {
						if (res.confirm) {
							uni.removeStorage({
								key: '__ddminiUserInfo',
								// success: () => {
								// 		setTimeout(() => {
								// 			this.$router.go(0)
								// 		}, 500)
								// }
							});
							uni.navigateTo({
								url:'/pages/user/login'
							})
						} else if (res.cancel) {}
					}
				});
			},
			Topath(route) {
				uni.navigateTo({
					url: route
				})
			},
			TopathF(index){
				console.log(1111111111111)
				const self = this
				if(self.ddminiUserInfo.accessToken == null){
					uni.showToast({
						title:"请先登录!"
					})
				}else{
					if(index==4){
						uni.navigateTo({
							url: `/pages/order/service/index?id=${index}`
						})
					}else{
						uni.navigateTo({
							url: `/pages/order/order?id=${index}`
						})
					}
				}
			},
			// Topath(`/pages/order/order?id=${index}`)
			getInfo(){
				let self=this;
				let id=self.ddminiUserInfo.id
				self.Get('/api/user/searchUserInfoById',{userId:id}).then(res=>{
					if(res.code==200){
						self.userInfo=res.body;
						console.log(self.userInfo,'用户信息');
						uni.setStorageSync('userPayJson',res.body.userPayJson)
					}
				})
			},
			chooseavatar(img){
				let self = this;
				self.editNameStatus = false;
				uni.showLoading({title: '头像更新中', mask: true});
							// /api/file/uploadImages
				let data = {
					file: img.detail.avatarUrl, //你要传的临时文件
					type: 1
				}
				self.Upload(self.Url.uploadFile, data).then(res => {
					console.log(res,'1111')
					if(res.code === 200){
						self.Post3(self.Url.userEdit, {headImg: res.body}).then(ues => {
							if(ues.code === 200){
								self.userInfo.headImg = res.body;
								self.editNameStatus = false;
								uni.hideLoading();
								uni.showToast({title: '更新成功'});
							}
						})
					}else{
						uni.hideLoading();
						uni.showModal({content: res.msg,showCancel: false});
					}
				})
			},
			updatenickname(e){
				let self = this;
				uni.showLoading({title: '昵称更新中', mask: true});
				self.Post3(self.Url.userEdit, {userName: e.detail.value}).then(ues => {
					if(ues.code === 200){
						self.editNameStatus = false;
						self.userNickName = e.detail.value;
						uni.hideLoading();
						uni.showToast({title: '更新成功'});
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.address {
		font-size: 30rpx;
		display: flex;
		height: 100rpx;
		// margin-bottom: 18rpx;
		align-items: center;
		font-size: 28rpx;
		padding: 0 50rpx;
		justify-content: space-between;
		box-sizing: border-box;
		// border-bottom: ;
	
		.myserver {
			display: flex;
			align-items: center;
			width: 96%;
	
			.mytitle {
				margin-left:18rpx;
				color: #000;
			}
	
			.contactBtn {
				width: 96%;
				border: none;
				height: 90rpx;
				line-height: 90rpx;
				text-align: left;
				font-size: 30rpx;
				padding: 0rpx;
			}
		}
	}
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.common {
			width: 94%;
			border-radius: 16rpx;
			background-color: #fff;
			// box-shadow: 0px 0px 16rpx 0px rgba(207, 207, 207, 0.5);
		}

		.login-top {
			color: #fff;
			width: 100%;
			height: 360rpx;
			// background-image: linear-gradient(#ff5e31, #ff4a31, #faa390, #f7e5df);
			background-color:#ff5e31;
			border-radius: 0 0 40rpx 40rpx;
			// border-bottom: 3rpx dashed #000;
			.login {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 70rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
				color: #fff;

				.login-left {
					display: flex;
					align-items: center;

					.avatar {
						width: 100rpx;
						height: 100rpx;
						margin-right: 20rpx;
						border-radius: 50%;
					}

					.login-now {
						height: 60rpx;
						width: 160rpx;
						text-align: center;
						line-height: 60rpx;
						border: 3rpx solid #fff;
						border-radius: 30rpx;
					}
				}

				.login-right {
					display: flex;
					align-items: center;
					height: 60rpx;
					width: 160rpx;
					border: 3rpx solid #fff;
					border-right: none;
					padding-left: 6rpx;
					border-radius: 30rpx 0 0 30rpx;
				}
			}

			.collect {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30rpx;
				padding: 0 60rpx;
				box-sizing: border-box;
				font-size: 32rpx;

				.collect-text {
					display: flex;
					align-items: center;
				}

				.collect-num {
					text-align: center;
					margin-bottom: 30rpx;
				}

				.line {
					width: 3rpx;
					height: 80rpx;
					background-color: #fff;
				}
			}
		}

		.order {
			height: 260rpx;
			padding: 18rpx;
			box-sizing: border-box;
			margin-top: -110rpx;
			.gridBox{
				width: 100rpx;
				height: 100rpx;
				border-radius:100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color:#F2F2F2;
			}
			.order-title {
				display: flex;
				justify-content: space-between;
				margin-bottom: 30rpx;

				.my-order {
					font-size: 32rpx;
					font-weight: 600;
					font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
				}

				.more {
					display: flex;
					align-items: center;
					color: #9a9a9a;
				}
			}

			.grid-text {
				margin-top: 10rpx;
				font-size: 26rpx;
				color: #000;
			}
		}

		.score {
			display: flex;
			justify-content: space-around;
			padding: 20rpx 10rpx;
			box-sizing: border-box;
			margin: 30rpx auto;

			.cardNum {
				text-align: center;
				font-size: 36rpx;
				font-weight: 600;
				margin-bottom: 20rpx;
			}

			.card-img {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;

				image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 4rpx;
				}
			}
		}

		.menu {
			padding: 30rpx;
			box-sizing: border-box;
			margin: 30rpx auto;
			
			.menu-title {
				margin-bottom: 26rpx;
				font-size: 32rpx;
				font-weight: 600;
				font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			}

			.removeStorge {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height:100rpx;
				// margin-top:10rpx;
				// margin-bottom: 20rpx;
				.removeStorge-left {
					width: 200rpx;
					display: flex;
					align-items: center;
					.remove-img {
						width: 40rpx;
						height: 40rpx;
						margin-right: 18rpx;
					}
					.remove-text {
						white-space: nowrap;
						font-size: 30rpx;
						color: #000;
					}
				}
			}
		}
		.remove-img {
			width: 50rpx;
			height: 50rpx;
			// margin-right: 15rpx;
		}
	}
	
	
	.user_box{
			width: 90%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			// height: 220rpx;
			.avatar{
				width: 120rpx;
				height: 120rpx;
				position: relative;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 100%;
				}
				.edit{
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 100%;
					bottom: 0;
					right: -6rpx;
					background-color: #F54319;
				}
				button{
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					opacity: 0;
				}
			}
			.info{
				flex: 1;
				min-width: 0;
				color: #fff;
				padding-left: 30rpx;
				.name{
					font-size: 32rpx;
					font-weight: bold;
					display: flex;
					align-items: center;
					.tit{
						max-width: 350rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					input{
						border: 1px solid #fff;
						height: 60rpx;
						padding-left: 20rpx;
						font-weight: normal;
						border-radius: 10rpx;
						line-height: 60rpx;
						font-size: 30rpx;
						width: 380rpx;
					}
					.edit{
						margin-left: 10rpx;
						width: 44rpx;
						height: 44rpx;
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
				}
				.text{
					font-size: 26rpx;
					padding-top: 10rpx;
				}
			}
		}
</style>
