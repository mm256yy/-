<template>
	<view class="content">
		<!-- <view class="search common" @click="Topath('/pages/index/search')">
			<input type="text" placeholder="请输入商品搜索">
			<u-icon name="search" size="24"></u-icon>
		</view> -->
		<view class="fixed_head_box">
			<navBar @height="barHeight=$event" :store="storeData"></navBar>
		</view>
		<!-- 		<view class="search" @click="Topath('/pages/index/search')" >
			<!-- <input class="inp" type="text" placeholder="搜索">
			<view class="search-icon">
				<u-icon name="search" size="16"></u-icon>
			</view> -->
		<!-- 			<u-search :showAction="true" actionText="搜索" :animation="true"></u-search>
		</view> --> 
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :style="{marginTop: barHeight+'px'}">
			<swiper-item class="swiper-box" v-for="(item,index) in recommendedList" :key="index">
				<image class="swiper-img" :src="item.activityImgUrl" lazy-load="true" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="kefu common">
			<view class="category cates">
				<u-grid :border="false" col="4">
					<u-grid-item v-for="(item,index) in categoryList" @click="categoryItemTap(index,item.categoryName)"
						:key="index">
						<image class="grid-img" :src="item.icon" mode="aspectFill"></image>
						<text class="grid-text2">{{item.categoryName}}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 热销产品 -->
		<view class="hot-title" id="scrollView" :style="isTop == 1	 ? 'top:'+barHeight+'px;'+'position:fixed;background:#FFFFFF;z-index:100000;border-bottom: 1rpx solid #f2f2f2;margin-bottom: 20rpx;width:100%;margin-top:0rpx':''">
			<view class="hot-text" >热销产品</view>
		</view>
		<view class="recommend ">
<!-- 			<view class="hot-title" id="scrollView" :style="isTop == 1	 ? 'top:'+barHeight+'px;'+'position:fixed;background:#FFFFFF;z-index:100000;border-bottom: 1rpx solid #f2f2f2;margin-bottom: 20rpx;width:94%;left:3%;margin-top:0rpx':''">
				<view class="hot-text" >热销产品</view>
			</view> -->
<!-- 			<view class="hot-title" id="scrollView" :style="isTop == 1 ? 'top:'+barHeight+'px;'+'position:fixed;background:#FFFFFF;z-index:100000;border-bottom: 1rpx solid #f2f2f2;margin-bottom: 20rpx;width:92%':''">
			
				<view class="hot-text">热销产品</view>
			</view> -->
			<!-- 			<scroll-view scroll-x scroll-with-animation class="head_box" :style="{top: barHeight+'px'}">
				<view class="hot-title">
					<image  src="../../static/images/fire.png" mode="aspectFill"></image>
					<view class="hot-text">热销产品</view>
				</view>
			</scroll-view> -->
<!-- 			<scroll-view scroll-x scroll-with-animation class="head_box" :style="{top: barHeight+'px'}">
				<view class="list" :class="{alabel: true}">
					<span>热销产品</span>
				</view>
			</scroll-view> -->
			<view class="recommend-box">
				<view class="goods-block" v-for="(item,index) in data2" :key="index" @click.native="goodsItemClick"
					:data-index="index">
					<view class="goods-box">
						<image class="goods-img" :src="item.preview_url" mode=""></image>
						<view class="goods-name">
							{{item.goods_name}}
						</view>
						<view class="goods-price">
							<view class="price">
								<view class="price-left">
									<text>￥</text>
									<text class="price-text">{{item.goods_price}}</text>
								</view>
								<view class="price-right" v-if="item.scribe_price>0">
									<text>￥</text>
									<text>{{item.scribe_price}}</text>
								</view>
							</view>
							<u-icon name="shopping-cart" color="#ff4544" size="28">
							</u-icon>
						</view>
						<view class="month_sales">
							<!-- 销量:{{item.total_sales}} -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <backtop ref="VT" :scrollTop="top"></backtop> -->
		<tabbar :current="0"></tabbar>
	</view>
</template>
<script>
	const app = getApp();
	import JSONBig from 'json-bigint'
	export default {
		data() {
			return {
				template: '',
				data1: [], //客服列表
				data2: [], //热销商品
				categoryList: [],
				recommendedList: [],
				businessId: '',
				top: 0,
				barHeight: 0,
				storeData: null,
				isTop:0,
				myScroll:''
			}
		},
		onShow() {

			let self = this;
			let token = uni.getStorageSync('__shoplistInfo').accessToken;
			// if(token==null){
			// 	uni.navigateTo({
			// 		url:'/pages/user/login'
			// 	})
			// }
			self.getbussinessId()
			let name = uni.getStorageSync('__shoplistInfo')
			this.storeData = name ? name[0].businessName : '客如云';
			console.log(this.storeData, '1111')
		},
		// onPageScroll(e) {
		// 	this.$refs.VT.topData(e.scrollTop)
		// },
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#scrollView').boundingClientRect(data => {
				this.myScroll = data.top
			}).exec();
		},
		onPageScroll: function(e) {
			if (e.scrollTop > this.myScroll) {
				this.isTop = 1
			} else {
				this.isTop = 0
			}
		},
		onLoad(option) {
			try {
				if (option.shareUserId) {
					uni.setStorageSync('shareUserId', option.shareUserId)
					if (option.goodsId) {
						uni.navigateTo({
							url: "/pages/index/detail?id=" + option.goodsId
						})
					}


				}
			} catch (error) {
				console.log(error);
			}


			let self = this;
			let template = {
				color: {
					temp_color: '#ff4544',
					none_color: '#8A8B9C'
				}
			}
			self.template = template;
			uni.setStorage({
				key: '__ddminiTemplateConfig',
				data: template
			});
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
			Topath(route) {
				uni.navigateTo({
					url: route
				})
			},
			gophone(phone) {
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
			},
			getbussinessId() {
				let self = this;
				self.Get2('/api/plugs/getBusinessInfo').then(res => {
					if (res.code == 200) {
						let list = res.body;
						let listArr = [];
						list.forEach((item) => {
							listArr.push(JSONBig.parse(item.jsonData))
						})
						self.BusinessList = listArr;
						self.businessId = self.BusinessList[0].businessId;
						uni.setStorage({
							key: '__ddminiStoreInfo',
							data: self.businessId
						});
						this.initData();
					}
				})
			},
			initData() {
				let self = this;
				self.Get(`/api/plugs/getHomeDataInfo?businessId=${self.businessId}`).then(res => {
					if (res.code == 200) {
						let dict = res.body.jsonViewData;
						self.data1 = dict[0].data;
						self.data2 = dict[1].data;
						// console.log(self.data2,'kkkkkk')
					}
				})
				// let bussinessId = uni.getStorageSync('__shoplistInfo')[0].businessId || 0
				this.Get(`/api/plugs/getShopGoodCategoryList?businessId=${self.businessId}`).then(res => {
					if (res.code == 200) {
						this.categoryList = res.body.list
					}
				})
				self.Get(`/api/plugs/searchPlugsRecommendedList?businessId=${self.businessId}&userServiceToken=
T2UZ8Z79OFNYZ962F85XH`).then(res => {
					if (res.code == 200) {
						let list = res.body.list;
						self.recommendedList = list.filter(itm => itm.type === 'home_data');
					}
				})
			},
			categoryItemTap(index, name) {
				let dict = this.categoryList[index]
				uni.navigateTo({
					url: `/pages/index/category?id=${dict.id}&&name=${name}`
				})
			},

			goodsItemClick(e) {
				let index = e.currentTarget.dataset.index
				let id = this.data2[index].id
				uni.navigateTo({
					url: `/pages/index/detail?id=${id}`
				})
			},
			addToCart(index) {
				let dict = this.data2[index]
				// console.log(dict.categoryId)
				let postData = {
					goodsId: dict.id,
					goodsCategoryId: dict.categoryId,
					goodsNum: 1,
					goodsSpecificationIds: '0'
				};
				this.Post2('/api/plugs/insertPlugsShopCart', postData).then(res => {
					// console.log("insertPlugsShopCart", res)
					if (res.code == 200) {

					}
				})
			},
		}
	}
</script>

<style lang="less">
	page{
	  background-color: white;	
	}
	.content {
		width: 100%;
		display: flex;
		overflow-x: hidden;
		flex-direction: column;
		// align-items: center;
		justify-content: center;
		position: relative;

		.common {
			// width: 94%;
			border-radius: 16rpx;
			background-color: #fff;
			// box-shadow: 0px 0px 8px 0px rgba(207, 207, 207, 0.5);
		}

		.search {
			width: 100%;
			height: 90rpx;
			padding: 30rpx;
			box-sizing: border-box;
			// background-color: #ff5d32;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			position: relative;

			// margin-bottom: 10rpx;
			.inp {
				width: 96%;
				// position: absolute;
				// left: 58%;
				// top: 40rpx;
				text-align: center;
				height: 60rpx;
				margin: auto;
				border-radius: 30rpx;
				background-color: #FFFFFF;
			}

			.search-icon {
				position: absolute;
				left: 54%;
				top: 30rpx;
			}
		}

		// .search {
		// 	height: 80rpx;
		// 	background-color: ;
		// 	box-sizing: border-box;
		// 	padding: 10rpx;
		// 	margin: 18rpx auto;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: space-between;
		// }

		.swiper {
			width: 96%;
			height: 400rpx;
			border-radius: 16rpx;
			// margin-bottom: 18rpx;
			// margin-top: 120rpx;
            margin: 0 auto;
			.swiper-box {
				width: 100%;
				height: 400rpx;
				margin: 0 auto;
			}

			.swiper-img {
				// border-radius: 16rpx;
				height: 400rpx;
				border-radius:15rpx;
			}
		}

		.kefu {
			padding: 20rpx;
			box-sizing: border-box;
			margin-top: -80rpx;
			z-index: 99;
            width: 96%;
			margin: 0rpx auto;
			.cates {
				// height: 352rpx;
				box-sizing: border-box;
				overflow: hidden;
			}

			.category {
				// margin-top: 40rpx;

				.grid-img {
					margin-top: 20rpx;
				}

				.grid-text2 {
					margin-top: 12rpx;
					font-size: 26rpx;
				}
			}

			.grid-img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 16rpx;
			}

			.grid-text {
				position: absolute;
				padding: 0 !important;
				left: 15rpx;
				bottom: -16rpx;
				display: inline-block;
				width: 70rpx;
				text-align: center;
				// background-color: aqua;
				font-size: 26rpx;
			}
		}
			.hot-title {
				width: 96%;
				margin: 0 auto;
				display: flex;
				// justify-content: space-around;
				align-items: center;
				// margin: 30rpx 0rpx;
				box-sizing: border-box;
				padding: 30rpx;
				font-size: 36rpx;
				font-weight: 700;
			    // border-bottom: 1rpx solid #f2f2f2;
			    margin-bottom: 20rpx;
				
				background-color: #fff;
				border-radius: 16rpx;
				// margin-top: 100rpx;
				// padding: 0 30rpx 30rpx 30rpx;
				box-sizing: border-box;
				// width: 94%;
				.hot-text{
					// padding: 20rpx;
				}
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 6rpx;
				}
			}

		.recommend {
			// width: 92%;
			background-color: #fff;
			border-radius: 16rpx;
			// margin-top: 20rpx;
			// padding: 0 30rpx 30rpx 30rpx;
			box-sizing: border-box;
			width: 92%;
			margin: 0rpx auto;
			.recommend-box {
				width: 100%;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.goods-block {
					width: 48%;
					// padding-top:20rpx;
				}

				.goods-box {
					width: 100%;
					height: 470rpx;
					border-radius: 16rpx;
					box-sizing: border-box;
					background-color: #fff;
					margin-bottom: 20rpx;
					border: 3rpx solid #f5f5f5;
					// padding: 20rpx;
					// box-shadow: 0px 0px 8px 0px rgba(207, 207, 207, 0.5);

					.goods-img {
						width: 100%;
						height: 330rpx;
						border-radius: 16rpx 16rpx 0 0;
					}

					.goods-name {
						width: 94%;
						margin: 10rpx auto;
						font-size: 28rpx;
						display: -webkit-box; //将对象作为弹性伸缩盒子模型显示
						-webkit-box-orient: vertical; //设置或检索伸缩盒对象的子元素的排列方式
						-webkit-line-clamp: 1; //一个块元素显示的文本的行数
						overflow: hidden; //溢出隐藏
					}

					.goods-price {
						width: 94%;
						margin: auto;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.price {
							color: #ff4544;
							display: flex;
							align-items: center;

							.price-text {
								font-size: 34rpx;
								font-weight: 600;
							}

							.price-right {
								margin-left: 12rpx;
								font-size: 26rpx !important;
								font-weight: 400 !important;
								color: #aaa;
								margin-left: 18rpx;
								text-decoration: line-through;
							}
						}
					}

					.month_sales {
						width: 94%;
						margin: auto;
						font-size: 22rpx;
						color: #aaa;
					}
				}
			}
		}
	}

	.fixed_head_box {
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
</style>