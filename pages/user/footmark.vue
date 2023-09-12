<template>
	<view class="content">
		<view v-if="invoiceList.length>0" class="invoice_list_box">
			<view class="invoice_box" v-for="(item, index) in invoiceList" :key="index">
				<view class="header" :style="'border-color:'+template.color.temp_color">
					<view class="label">
						<view class="name">开票名称</view>
						<view class="text">{{item.company_name}}</view>
					</view>
					<view class="label">
						<view class="name">开票税号</view>
						<view class="text">{{item.company_tax}}</view>
					</view>
					<view class="label">
						<view class="name">开票金额</view>
						<view class="text">{{item.money}}元</view>
					</view>
				</view>
				<view class="hovers">
					<view class="left"></view>
					<view class="line"></view>
					<view class="right"></view>
				</view>
				<view class="footer">
					<view class="label" v-if="item.user_phone">
						<view class="name">联系手机</view>
						<view class="text">{{item.user_phone}}</view>
					</view>
					<view class="label" v-if="item.user_email">
						<view class="name">联系邮箱</view>
						<view class="text">{{item.user_email}}</view>
					</view>
					<view class="label">
						<view class="name">申请时间</view>
						<view class="text">{{item.createTime}}</view>
					</view>
					<view class="label" v-if="item.remark">
						<view class="name">开票备注</view>
						<view class="text">{{item.remark}}</view>
					</view>
<!-- 					<view class="label">
						<view class="name">开票状态</view>
						<view class="text" :style="item.status?'color:'+template.color.temp_color:'color:#ed4014;'">{{item.status?'已开票':'待开票'}}</view>
					</view> -->
				</view>
				<view class="coupon"></view>
			</view>
			<view class="total" v-if="invoiceList.length>0">
				<span v-if="pages.page<pages.total">总{{pages.total}}页，当前第{{pages.page}}页</span>
				<span v-else>数据已全部加载完毕</span>
			</view>
		</view>
		<view v-else class="none_list_box">
			<image src="../../static/images/none_data_icon_02.png" mode="aspectFill"></image>
			<span class="tit">暂无开票申请记录</span>
		</view>
		<view class="invoice_footer" @click="getInvoiceOrderTap()" :style="'background-color:'+template.color.temp_color">申请开具发票</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		components: {},
		data() {
			return {
				template: uni.getStorageSync('__ddminiTemplateConfig'),
				invoiceList: [],
				pages: {
					page: 1,
					sizes: 10,
					total: 1
				},
				ddminiUserInfo:'',
			}
		},
		onShow() {
			let self = this;
			self.invoiceList = [];
			self.getInvoiceassistantList();
            self.ddminiUserInfo = uni.getStorageSync('__ddminiUserInfo');
		},
		onReachBottom() {
			let self = this;
			if(self.pages.page<self.pages.total){
				self.pages.page++
				self.getInvoiceassistantList();
			}
		},
		methods: {
			getInvoiceassistantList() {
				let self = this;
				let postData = {
					page: self.pages.page,
					sizes: self.pages.sizes,
					plugsId:180
				}
				self.Get('/api/plugs/searchPlugsDataList', postData).then(res => {
					if(res.code === 200){
						self.pages.total = res.body.total;
						// if(self.invoiceList.length>0){
							res.body.list.forEach(item=>{
								item.jsonViewData.createTime=item.createTime
								let list = self.invoiceList.concat(item.jsonViewData);
								self.invoiceList = list;
								// self.invoiceList.forEach(ite=>{
								// 	ite.createTime=item.createTime
								// })
								console.log(self.invoiceList,'1111')
								})
							// let list = self.invoiceList.concat(res.body.list);
							// self.invoiceList = list;
						// }else{
							// self.invoiceList = res.body.list;
						// }
					}
				})
			},
			getInvoiceOrderTap() {
				if(this.ddminiUserInfo.accessToken){
					uni.navigateTo({url: '/pages/user/invoice_order'});
				}else{
					uni.navigateTo({url: '/pages/user/login'});
				}
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
	}
	.invoice_list_box{
		padding-top: 30rpx;
		padding-bottom: 150rpx;
		.invoice_box{
			width: 92%;
			margin: 0 auto;
			background-color: #efefef;
			overflow: hidden;
			margin-bottom: 30rpx;
			.header, .footer{
				padding: 20rpx 0 10rpx;
				border-top: 6rpx solid #07C160;
				.label{
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 90%;
					margin: 0 auto;
					height: 60rpx;
					font-size: 28rpx;
					.name{
						flex: 0 0 25%;
						min-width: 0;
					}
					.text{
						flex: 0 0 75%;
						min-width: 0;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
			.footer{
				padding: 10rpx 0 20rpx;
				border-top: none;
			}
			.coupon{
				background-image: radial-gradient( circle at 6px 8px, #fff 6px, #efefef 6px, #efefef 0);
				background-size: 28rpx 30px;
				width: 100%;
				height: 20rpx;
			}
			.hovers{
				position: relative;
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				.left,.right{
					position: absolute;
					width: 40rpx;
					height: 40rpx;
					background-color: #fff;
					border-radius: 100%;
					left: -20rpx;
				}
				.line{
					width: 100%;
					height: 1px;
					border-top: 1px dashed #fff;
				}
				.right{
					left: auto;
					right: -20rpx;
				}
			}
		}
		.total{
			display: flex;
			align-items: center;
			justify-content: center;
			color: #999;
			font-size: 26rpx;
			height: 100rpx;
		}
	}
	.invoice_footer{
		position: fixed;
		bottom: 50rpx;
		width: 60%;
		height: 70rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		color: #fff;
		background-color: #000;
		border-radius: 100rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
