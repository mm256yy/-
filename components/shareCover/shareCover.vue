<template>
	<view class="content" >
		<u-modal closeOnClickOverlay :show="shareCoverShow" @close="closeShareCoverTap()">
			<l-painter :board="base" isCanvasToTempFilePath @success="posters($event)" />
			<view class="show_button_box" slot="confirmButton">
				<view class="card_button" @click="closeShareCoverTap()">关闭</view>
				<view class="card_button card_save" @click="saveShareCoverTap()">保存海报</view>
			</view>
			<!-- <image src="../../static/images/bgc.png" mode="" style="position: absolute;left: 0;top: -50px;"></image> -->
		</u-modal>
	</view>
</template>

<script>
	import lPainter from '@/uni_modeles/components/l-painter/l-painter.vue'
	import lPainterView from '@/uni_modeles/components/l-painter-view/l-painter-view.vue'
	import lPainterText from '@/uni_modeles/components/l-painter-text/l-painter-text.vue'


	export default {
		props: {
			goodsData: {
				type: Object,
				value: {}
			}
		},
		components: {
			lPainter,
			lPainterView,
			lPainterText
		},

		data() {
			return {
				shopInfo: uni.getStorageSync('__ddminiShopInfo'),
				shareCoverShow: true,
				tempFilePath: '',
				qrcodePic: '',
				bannerPic: '',
				base: {
					width: '686rpx',
					height: '800rpx',
					// background: 'yellow',
					// backgroundImage:'../../static/images/bgc.png',
					views: [
						// {
						// 	type: 'image',
						// 	src: 'https://m.360buyimg.com/babel/jfs/t1/196317/32/13733/288158/60f4ea39E6fb378ed/d69205b1a8ed3c97.jpg',
						// 	css: {
						// 		width: '100%',
						// 		height: '100%',
						// 		position: "absolute",
						// 	 			left: '0',
						// 					top: '0',
						// 	}
						// },
						// {
						// 	css: {
						// 		width: '686rpx',
						// 		height: '350rpx',
						// 		display: "inline-block",
						// 	},
						// 	views: [{
						// 		type: 'image',
						// 		src: '../../static/images/bgc.png',
						// 		mode: 'scaleToFill',
						// 		css: {
						// 			// radius: '32rpx 32rpx 0rpx 0rpx',
						// 			position: "absolute",
						// 			left: '0',
						// 			top: '0',
						// 			width: '100%',
						// 			height: '100%',
						// 		}
						// 	}],
						// 	type: "view"
						// },
						{
							css: {
								width: '686rpx',
								height: '350rpx',
								display: "inline-block",
							},
							views: [{
								type: 'image',
								src: this.goodsData.previewUrl,
								mode: 'scaleToFill',
								css: {
									// radius: '32rpx 32rpx 0rpx 0rpx',
									// position: "absolute",
									// left: '20%',
									// top: '2%',
									
									margin:'0 auto',
									width: '50%',
									paddingTop:'1%',
									height: '386rpx',
									zIndex:'999999',
								}
							}],
							type: "view"
						},
						{
							css: {
								width: '686rpx',
								height: '400rpx',
								display: "inline-block",
							},
							views: [{
									type: 'text',
									text: '￥',
									css: {
										color: '#FE4F02',
										position: "absolute",
										left: '100rpx',
										top: '180rpx',
										fontSize: '26rpx',
										lineHeight: '45rpx',
										zIndex:'999999',
									}
								},
								{
									type: 'text',
									text: this.goodsData.goodsPrice,
									css: {
										color: '#FE4F02',
										position: "absolute",
										left: '130rpx',
										top: '180rpx',
										fontWerght: 'bold',
										fontSize: '40rpx',
										lineHeight: '45rpx'
									}
								},
								{
									type: 'text',
									text: this.goodsData.goodsName,
									css: {
										maxLines: 1,
										position: "absolute",
										width: '500rpx',
										color: '#1A1A1A',
										left: '100rpx',
										top: '130rpx',
										fontSize: '32rpx',
										fontWerght: 'bold',
										lineHeight: '45rpx'
									}
								},
								{
									type: 'text',
									text: '扫描或长按二维码',
									css: {
										position: "absolute",
										width: '500rpx',
										color: '#a3a3a3',
										left: '100rpx',
										top: '250rpx',
										fontSize: '20rpx',
										lineHeight: '45rpx'
									}
								},
								{
									type: 'text',
									text: '查看商品详情',
									css: {
										position: "absolute",
										width: '500rpx',
										color: '#a3a3a3',
										left: '100rpx',
										top: '300rpx',
										fontSize: '20rpx',
										lineHeight: '45rpx'
									}
								}
							],
							type: "view"
						},
						{
							css: {
								position: "absolute",
								top: '360rpx',
								left: '60rpx',
								width: '170rpx',
								height: '220rpx',
								display: "inline-block",
								borderRadius: '16rpx',
								boxShadow: "0 20rpx 58rpx rgba(0,0,0,.15)"
							},
							views: [
								{
									type: 'image',
									src: '',
									mode: 'widthFix',
									css: {
										position: "absolute",
										top: '180rpx',
										left: '230%',
										width: '160rpx',
										height: '160rpx',
										borderRadius: '50%'
									}
								}
							],
							type: "view"
						}
					]
				},
				test1: null
			};
		},
		onReady() {
			let self = this;
			console.log(this.goodsData, '测试',this.goodsData.id )
			let user = uni.getStorageSync('__ddminiUserInfo');
			let scene = `g=${self.goodsData.id}`;
			if (user) {
				scene = `g=${self.goodsData.id},f=${user.id}`;
			}
			uni.showLoading({
				title: '海报绘制中',
				mask: true
			});
			let postdata = {
				pages: 'pages/index/detail',
				// scene: scene,
				// dtime: 1,
				// parms:this.goodsData.id
				parms:this.goodsData.id
			}
			console.log(postdata, '11111111111')
			this.Get('/api/plugs/getWxProgramQRCode', postdata).then(res => {
				this.base.views[2].views[0].src = res.body;
				uni.hideLoading();
			})
		},
		methods: {
			test() {
				console.log('test', 11)
			},
			posters(event) {
				this.tempFilePath = event
			},

			changeImg(imgUrl) {
				// console.log(imgUrl)
			},
			saveShareCoverTap() {				
				    let base64 = this.tempFilePath.replace(/^data:image\/\w+;base64,/, "");//去掉data:image/png;base64,
					var fileManager = uni.getFileSystemManager();
					let that=this
					fileManager.writeFile({
						filePath: wx.env.USER_DATA_PATH+'/img.jpg', // 指定图片的临时路径
						data: base64, // 要写入的文本或二进制数据
						encoding: 'base64', // 指定写入文件的字符编码
						success: res => {
							console.log('写入文件成功', res)
							console.log(wx.env.USER_DATA_PATH + '/img.jpg')
							uni.saveImageToPhotosAlbum({ // 保存图片到相册
							  filePath: wx.env.USER_DATA_PATH + '/img.jpg',
							  success: function (res) {
								  console.log('保存成功', res)
									uni.showToast({
									  title: '保存成功',
									})
									that.$emit('closeShare', true);
							  },
							  fail: function (err) {
								  console.log('保存失败', err)
							  }
							})
						},
						file: err => {
							console.log('写入文件失败', err)
						}
					})
			},
			toTempFilePath(path) {
				uni.hideLoading();
				console.log(path, '1111111111111111111111111111')
				this.tempFilePath = path;
				this.shareCoverShow = true;
			},
			fail(e) {
				console.log(e)
			},
			previewImage() {
				let self = this;
				uni.previewImage({
					urls: [self.tempFilePath],
					current: self.tempFilePath
				});
			},
			closeShareCoverTap() {
				this.$emit('closeShare', true);
			}
		}
	};
</script>

<style lang="scss">
	// .data-v-713d0fd3
	.show_cover_modal {
		width: 100%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 100%;
			border-radius: 10rpx;
			overflow: hidden;
		}
	}

	.show_button_box {
		display: flex;
		justify-content: center;
		.card_button {
			border: 1px solid #fe4747;
			color: #fe4747;
			font-size: 30rpx;
			padding: 10rpx 50rpx;
			border-radius: 10rpx;
		}

		.card_save {
			margin-left: 50rpx;
			background-color: #fe4747;
			color: #fff;
		}
	}
</style>

