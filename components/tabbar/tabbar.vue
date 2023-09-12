<template>
	<view>
		<view class="tabbar_after_box">
			<view class="after"></view>
		</view>
		<view  class="tabbar_box" :style="tabbarList.backgroundColor? 'background:'+tabbarList.backgroundColor:''">
			<view class="tabbar">
				<view class="label" v-for="(item, index) in tabbarList.iconList" :key="index"
					@click.stop="selectTabbarTap(index)">
						<view class="icons">
							<image :src="current===index?item.iconDefaultImage:item.iconSelectImage"></image>
						</view>
						<view class="name" :style="tabbarList.textDefaultColor? 'color:'+tabbarList.textDefaultColor:''">
							{{item.iconName}}
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import json_parse from 'json-bigint/lib/parse';
	export default {
		name: 'tabbar',
		props: {
			current: {
				type: Number,
				default: 0
			}

		},
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				tabbarList: {},
				 show:false,
				 showMe:'showMe',
				  styleobj: {color:'#fff'}
			}
		},
        
		created() {
			let params = {
				userServiceToken: 'T2UZ8Z79OFNYZ962F85XH'
			}
			this.Get('/api/platform/getUserTemplateConf', params).then(res => {
				if (res.code == 200) {
					let data = res.body.templateConf.templateConfJson
					let newData = res.body.templateSettingsJson
					if (res.body.templateConf.templateConfJson) {
						let dataList = JSON.parse(data)
						this.tabbarList = dataList.bottomNavigationBar
						console.log(this.tabbarList,'测试')
					} else {
						let newDataList = JSON.parse(newData)
						this.tabbarList = newDataList.bottomNavigationBar
					}
				}
			})
		},
		// computed:{
		// 	themeStyle(){
		// 		return {
		// 									color: '#eee',
		// 									border: '1px solid #eee'
		// 								}

		// 	}
		// },
		methods: {
			selectTabbarTap(index) {
				console.log(index)
				let self = this;
				let path = self.tabbarList.iconList[index].jumpPosition;
				uni.switchTab({
					url: path
				});
			}
		}
	}
</script>

<style lang="less">
	.tabbar_after_box {
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);

		.after {
			width: 100%;
			height: 120rpx;
		}
	}
    .showMe{
		color:red;
	}
	.tabbar_box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1000;
		background-color: #fff;
		padding-bottom: env(safe-area-inset-bottom);

		.tabbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 110rpx;
			width: 100%;

			.label {
				flex: 1;
				min-width: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				.icons {
					width: 50rpx;
					height: 50rpx;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.name {
					font-size: 24rpx;
				}
			}
		}
	}
</style>