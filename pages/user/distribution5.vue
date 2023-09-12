<template>
	<view class="">
	<view class="price-banner">
		<view class="title">
			累计金额
		</view>
		<view class="price">
			￥2500
		</view>
		<u-button type="primary" shape="circle"  :customStyle="btn">
			立即提现
		</u-button>
		<view class="float-banner">
			<view class="" v-for="(item,index) in boxList" :key="index" @click="boxCheck(index)"  :style="menuActive===index?'padding:20rpx':''">
				{{item}}
			</view>
		</view>
	</view>
	<view class="check-list">
		<view class=""  v-for="(item,index) in list" :key="index" @click="listCheck(index)" :class="{amenuF:menuActiveF===index}">
			{{item}}
		</view>
	</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				btn: {
								width:'30%',
								marginLeft:'40rpx'
					},
				list:['提成记录','提现记录'],
				boxList:['可提现','历史提现'],
				menuActive:0,
				menuActiveF:0,
			}
		},
		methods:{
			boxCheck(index){
				this.menuActive=index
			},
			listCheck(index){
                this.menuActiveF=index					
			}
		}
	}
</script>

<style lang="less">
	page{
		background-color: #F6F6F6;
	}
	.price-banner{
		width: 100%;
		height: 320rpx;
		background-color: #ff5e31;
		position: relative;
		.title{
			padding: 40rpx;
			font-weight: bold;
			font-size: 40rpx;
		}
		.price{
			padding: 0rpx 40rpx 40rpx 40rpx;
			font-weight: bold;
		}
	}
	.float-banner{
		position: absolute;
		right: 0;
		top:50rpx;
		view{
			background-color: aliceblue;
            border-radius:50rpx 0 0 50rpx;
			margin: 20rpx 0;
			padding: 10rpx;
			font-size: 25rpx;
		}
	}
	.check-list{
		display: flex;
		view{
			margin-right: 40rpx;
			padding: 40rpx;
		}
	}
	.amenu{
       padding: 20rpx;		
	}
	.amenuF{
		font-weight: bold;
		border-bottom: 4rpx solid #3c9cff;
	}
</style>