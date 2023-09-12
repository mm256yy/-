<template>
	<view>
		
		<view>
			<view style="display: flex;flex-direction: column;" class="header op">
				
				<view style="border-radius: 32rpx 32rpx 0 0;height: 300rpx;margin: 40rpx;display: flex;justify-content: space-between;" class="op1">
					<view style="margin: 20rpx;">
						<view class="title">
							累计金额
						</view>
						<!-- <view style="font-size: 22rpx;margin: 20rpx;">可提现(元)</view> -->
						<view style="font-size: 42rpx;font-weight: bolder;margin: 20rpx;" v-if="PersonOther">{{ ( (PersonOther.shareRebate || 0) - (PersonOther.withdrawShareRebate || 0) ).toFixed(2) }}</view>
						<view style="font-size: 42rpx;font-weight: bolder;margin: 20rpx;" v-else>0.00</view>
						<view class="">
							<!-- <u-button type="primary" shape="circle"  :customStyle="btn">
								立即提现
							</u-button> -->
							<button style="color: white; background-color: #F97;border-radius: 50rpx;margin-top: 70rpx;font-size: 30rpx;width: 240rpx;" @click="lijitixian('0')">立即提现</button>
						</view>
					</view>
<!-- 					<view class="op" style="font-size: 22rpx;padding: 5rpx;border-radius: 16rpx 0 0 16rpx;width: 120rpx;display: flex;align-items: center;justify-content: center;flex-direction: column;height: 80rpx;margin-top: 40rpx;">
						<view style="padding: 5rpx;" @click="lijitixian('0')">立即提现</view>
						<view style="padding: 5rpx;color:#c5ab80;" @click="lijitixian('1')">切换方式</view>
					</view> -->
					<view class="float-banner">
						<view class="" v-for="(item,index) in boxList" :key="index" @click="boxCheck(index)"  :style="menuActive===index?'padding:20rpx':''">
							{{item}}
						</view>
						<!-- <view style="padding: 5rpx;color:#c5ab80;" @click="lijitixian('1')">切换方式</view> -->
					</view>
				</view>
<!--               <view class="">
               	立即提现
               </view> -->
			</view>
<!-- 			<view class="content" style="height: 120rpx;position: relative;bottom: 150rpx;">
				<view style="display: flex;justify-content: space-between;margin: 30rpx;height: 120rpx;">
					<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view style="font-size: 24rpx;font-weight: bolder;">{{PersonOther.totalShareRebate || 0.00}}</view>
						<view style="font-size: 20rpx;">累计分享返利</view>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view style="font-size: 24rpx;font-weight: bolder;">{{PersonOther.totalSelfPurchaseRebate || 0.00}}</view>
						<view style="font-size: 20rpx;">累计自购返利</view>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view style="font-size: 24rpx;font-weight: bolder;">{{PersonOther.totalFriendRebate || 0.00}}</view>
						<view style="font-size: 20rpx;">累计好友返利</view>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view style="font-size: 24rpx;font-weight: bolder;">{{ PersonOther.withdrawShareRebate || 0.00}}</view>
						<view style="font-size: 20rpx;">积累提现</view>
					</view>
				</view>
			</view> -->
			<view style="padding: 10rpx;display: flex;justify-content: space-between;position: relative;border-radius: 16rpx;">
				<u-subsection :list="list" :current="curNow" @change="sectionChange" bold></u-subsection>
			</view>
<!-- 			<view class="check-list">
				<view class=""  v-for="(item,index) in list" :key="index" @click="listCheck(index)" :class="{amenuF:menuActiveF===index}">
					{{item}}
				</view>
			</view> -->
			
			<view style="position: relative;bottom: 150rpx;padding: 20rpx;background: white;border-radius: 16rpx;margin: 20rpx;" v-if="curNow == 1" v-for="(item,index) in tixian">
				<view style="display: flex;justify-content: space-around;border-radius: 8rpx;background: #EEEEEF;padding: 12rpx 7rpx;margin-top: 20rpx;font-weight: bolder;">
					<view v-if="item.withdrawType == 1">支付信息:<span style="text-shadow: 1rpx 1rpx white;">用户openid({{JSON.parse(item.withdrawInfo).wei_chat}})</span></view>
					<view v-if="item.withdrawType == 0">支付名称:<span style="text-shadow: 1rpx 1rpx white;">{{JSON.parse(item.withdrawInfo).userAlipay.name}}</span></view>
					<view v-if="item.withdrawType == 0">支付账号:<span style="text-shadow: 1rpx 1rpx white;">{{JSON.parse(item.withdrawInfo).userAlipay.account}}</span></view>
					<view v-if="item.withdrawType == 2">支付信息:<span style="text-shadow: 1rpx 1rpx white;">银行卡支付</span></view>	
					
				<!-- 	<view>付款流水号:
						<span style="text-shadow: 1rpx 1rpx white;">{{item.outPayNo}}</span>
					</view> -->
					
				</view>
				
				<view style="margin: 20rpx 0;">
					
					<view style="margin: 10rpx;">
						<view>提 现 标 题：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">{{item.withdrawTitle}}</span></view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>提 现 状 态：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;" v-if="item.withdrawStatus == 1">未打款</span>
							<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;" v-if="item.withdrawStatus == 2">已打款</span>
							<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;"v-else>未打款</span>
						</view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>提 现 类 型：
							<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;" v-if="item.withdrawType == 0">支付宝</span>
							<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;" v-if="item.withdrawType == 1">微信</span>
							<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;" v-if="item.withdrawType == 2">银行卡</span>
						</view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>提 现 金 额：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">￥{{item.withdrawAmount}}</span></view>
					</view>
					<view style="margin: 10rpx;">
						<view>提现手续费：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">￥{{item.withdrawServiceCharge}}</span></view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>提 现 时 间：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">{{item.createTime}}</span></view>
					</view>
					
				</view>
			</view>
			
	
			<view style="position: relative;bottom: 150rpx;padding: 20rpx;background: white;border-radius: 16rpx;margin: 20rpx;" class="op1" v-if="curNow == 0" v-for="item in RebateUserRecord">
				<view style="display: flex;justify-content: space-around;border-radius: 8rpx;background: #EEEEEF;padding: 12rpx 7rpx;margin-top: 20rpx;font-weight: bolder;">
					<view>分佣比例:<span style="text-shadow: 1rpx 1rpx white;">{{item.rebateRatio * 100}}%</span></view>
					<view>订单用户ID:<span style="text-shadow: 1rpx 1rpx white;">{{item.orderUserId}}</span></view>
			<!-- 		<view>返利类型:
						<span style="text-shadow: 1rpx 1rpx white;" v-if="item.rebaeType == 1">自购返佣</span>
						<span style="text-shadow: 1rpx 1rpx white;" v-if="item.rebaeType == 2">好友返佣</span>
						<span style="text-shadow: 1rpx 1rpx white;" v-if="item.rebaeType == 3">分享返佣</span>
					</view> -->
					
				</view>
				
				<view style="margin: 20rpx 0;">
					
					<view style="margin: 10rpx;">
						<view>订 单 ID：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">{{item.orderId}}</span></view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>订单编号：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">{{item.orderNo}}</span></view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>返利金额：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">￥{{item.rebateAmount}}</span></view>
					</view>
					
					<view style="margin: 10rpx;">
						<view>返利金额：
							<span v-if="item.rebaeType == 1" style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">自购返佣</span>
							<span v-else-if="item.rebaeType == 2" style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">好友返佣</span>
							<span v-else style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">分享返佣</span>
						</view>
						
					</view>
					
					<view style="margin: 10rpx;">
						<view>下单时间：<span style="color:#7a7a7a;text-shadow: 1rpx 1rpx white;">￥{{item.createTime}}</span></view>
					</view>
					
				</view>
			</view>
			
			<u-picker :show="show" :columns="columns"></u-picker>
			
			<u-modal :show="tixianshow"  title="提现"  @confirm="confirm" showCancelButton="true" showConfirmButton="true" @cancel="tixianshow=false">
				<view class="slot-content">
					
					<u--input
						v-if="niupi"
					    placeholder="请输入提现金额"
					    border="surround"
					    v-model="form1.money"
						type="number"
					  ></u--input>
					
					<div v-else>
						
						<div style="display: flex;justify-content: center;align-items: center;" @click="show=true">
							<div style="width: 160rpx">支 付 方 式:</div>
							
							<u-action-sheet :actions="list1" @select="selectClick" :title="title" :show="show"></u-action-sheet>
							<u--input
								disabled
							    placeholder="请选择支付方式"
							    border="surround"
							    v-model="userPayJson.bank_car.payName"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 1">
							<div style="width: 160rpx">支付宝名称:</div>
							<u--input
							    placeholder="请输入支付宝用户名"
							    border="surround"
							    v-model="userPayJson.userAlipay.name"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 1">
							<div style="width: 160rpx">支 付 账 号:</div>
							<u--input
							    placeholder="请输入支付账号"
							    border="surround"
							    v-model="userPayJson.userAlipay.account"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 2">
							<div style="width: 160rpx">银 行 卡 号:</div>
							<u--input
							    placeholder="请输入银行卡号"
							    border="surround"
							    v-model="userPayJson.bank_car.bankCardNo"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 2">
							<div style="width: 160rpx">手 机 号 码:</div>
							<u--input
							    placeholder="请输入手机号码"
							    border="surround"
							    v-model="userPayJson.bank_car.phone"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 2">
							<div style="width: 160rpx">银 行 名 称:</div>
							<u--input
							    placeholder="请输入银行名称"
							    border="surround"
							    v-model="userPayJson.bank_car.bankName"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 2">
							<div style="width: 160rpx">真 实 姓 名:</div>
							<u--input
							    placeholder="请输入真实姓名"
							    border="surround"
							    v-model="userPayJson.bank_car.userName"
								type="number"
							  ></u--input>
						</div>
						
						<div style="display: flex;justify-content: center;align-items: center;" v-if="index == 2">
							<div style="width: 160rpx">银 行 支 行:</div>
							<u--input
								placeholder="请输入银行支行"
								border="surround"
								v-model="userPayJson.bank_car.accountOpeningSubBranch"
								type="number"
							  ></u--input>
						</div>
					</div>
				</view>
			</u-modal>
			<view class="none_list_box" style="background-color: #fff;" v-if='tixian.length==0||RebateUserRecord.length==0'>
				<image src="../../static/images/none_data_icon_01.png" mode="widthFix"></image>
				<span>暂无{{titleName}}记录</span>
			</view>		
		</view>
	</view>
</template>

<script>
import { data } from 'uview-ui/libs/mixin/mixin'
	
	export default{
		data(){
			return{
				title:'支付方式',
				
				list1: [
					{
						name:'微信'
					},
					{
						name: '支付宝'
					},
					{
						name:"银行卡"
					}
				],
				openid:JSON.parse(uni.getStorageSync('__ddminiUserInfo')['associatedAccounJson'])['wechat_open_id'],
				show: false,
				form1:{
					money:''
				},
				form:{
					money:'',
					nickName:'',
					
				},
				tixianshow:false,
				PersonOther:{
					
				},
				list: ['分销记录', '提现记录'],
				curNow: 0,
				RebateUserRecord:[],
				userPayJson:JSON.parse(uni.getStorageSync('userPayJson')),
				personInfo:{},
				tixian:[],
				index:0,
				niupi:false,
				btn: {
								// width:'40%',
								// marginLeft:'40rpx'
					},
					boxList:['可提现','历史提现','切换方式'],
					menuActive:0,
				titleName:'分销'
			}
		},
		onLoad() {
			this.get_users()
			this.searchPlugsRebateByUserId()
			this.getRebateUserRecord()
		
		},
		onShow() {
			if(this.userPayJson.bank_car == 0 && this.userPayJson.userAlipay == 0 && this.userPayJson.wei_chat == 0 ){
				
				this.userPayJson = {
					"userAlipay":{
						"name":"",
						"account":""
						
					},
					"bank_car":{
						"bankCardNo":"",
						"phone":"",
						"bankName":"",
						"userName":"",
						"payName":"",
						"accountOpeningSubBranch":"",
					},
					"wei_chat":"",
					"businessAlipay":""
					}
			}else{
				this.niupi = true
			}
			
		},
		methods:{
			boxCheck(index){
				this.menuActive=index
				if(index==2){
					this.form1.money = ''
					this.userPayJson = {
						"userAlipay":{
							"name":"",
							"account":""
						},
						"bank_car":{
							"bankCardNo":"",
							"phone":"",
							"bankName":"",
							"userName":"",
							"payName":"",
							"accountOpeningSubBranch":"",
						},
						"wei_chat":"",
						"businessAlipay":""
					}
					
					this.niupi = false
					this.tixianshow = true
				}			
			},
			listCheck(index){
			    this.menuActiveF=index					
			},
			
			selectClick(index){
			
				this.userPayJson.bank_car.payName = index.name
				
				this.show = false

				if(index.name == '微信'){
					this.index = 0
				}else if(index.name == "支付宝"){
					this.index = 1
				}else{
					this.index = 2
				}
				
			},
			lijitixian(item){
				if(item == '0'){
					this.userPayJson = JSON.parse(uni.getStorageSync('userPayJson'))
				
					if(this.userPayJson.bank_car == 0 &&  this.userPayJson.userAlipay == 0 && this.userPayJson.wei_chat == 0){
						uni.showToast({
							title:"请先填写提现信息!",
							icon:"loading"
						})
					}else{
						this.niupi = true
						this.tixianshow = true
					}
					
					
					
				}	
			},
			
			get_users(){
				var self = this
				
				self.Get('/api/user/searchUserInfoById',{
					userId:uni.getStorageSync('__ddminiUserInfo')['id']
				}).then(res=>{
					if(res.code == 200){
						uni.setStorageSync('userPayJson',res.body.userPayJson)
						this.userPayJson = res.body.userPayJson
					}
					
				})
				
			},

			sectionChange(index) {
				var self = this
				this.tixian = []
				this.curNow = index
				if(index == 0){
					this.titleName='分销'
					this.getRebateUserRecord()
				}else if(index == 1){
					this.titleName='提现'
					self.Get('/api/plugs/getUserRebateWithdrawalRecord',{
						page:1
					}).then(res=>{					
						if(res.code == 200){
							this.tixian = res.body.list
						}
						
						
					})
				}
				
			},
			getRebateUserRecord(){
				var self = this
				var data = {
					page:1
				}
				
				self.Get('/api/plugs/getRebateUserRecord',data).then(res=>{
					if(res.code==200){
						self.RebateUserRecord=res.body.list;
					}
				})
			},
			searchPlugsRebateByUserId(){
				var self = this
				self.Get('/api/plugs/searchPlugsRebateByUserId').then(res=>{
				
					self.PersonOther=res.body;
				
	
				})
			},
			confirm(){
				var self = this
				
				var index = 0
	
				if(self.form1.money){
					
					
					if(self.userPayJson.wei_chat!='0' || self.userPayJson.wei_chat!=0){
						index = 1
					}else if(self.userPayJson.userAlipay!='0' || self.userPayJson.userAlipay!=0){
						index = 0
					}else if(self.userPayJson.bank_car!='0' || self.userPayJson.bank_car!=0){
						index = 2
					}
					console.log(index);
				
					try{
					
						if(Number(self.form1.money)<=( (this.PersonOther.shareRebate || 0) - (this.PersonOther.withdrawShareRebate || 0) ).toFixed(2)){
							var data = {
								withdrawType:index,
								openId:self.openid,
								type:1,
								money:self.form1.money
							}
							
							self.Get('/api/pay/userWithdrawal',data).then(res=>{
								
								if(res.code == 200){
									uni.showToast({
										title:"提现成功!"
									})
								}else{
									uni.showToast({
										title:"提现失败!"
									})
								}
							
							})
						}else{
							uni.showToast({
								title:"金额不足!"
							})
						}
					}catch(error){
						uni.showToast({
							title:"您没有分销记录！"
						})
					}
					
					
					
				}else if(self.index == 1){
					
					var self = this
					self.userPayJson.wei_chat = 0
					self.userPayJson.businessAlipay = 0
					self.userPayJson.bank_car = 0
					
					var data1 = {
						userPayJson:JSON.stringify(self.userPayJson)
					}
					
					self.Post3('/api/user/updateUserInfo',data1).then(res=>{
						if(res.code == 200){
							uni.showToast({
								title:"修改成功!"
							})
							this.get_users()
						}
					})
					
					
				}else if(self.index == 0){
					self.userPayJson.wei_chat = 0
					self.userPayJson.userAlipay = 0
					self.userPayJson.bank_car = 0
					self.userPayJson.wei_chat = self.openid
					var data1 = {
						userPayJson:JSON.stringify(self.userPayJson)
					}
					self.Post3('/api/user/updateUserInfo',data1).then(res=>{
						if(res.code == 200){
							uni.showToast({
								title:"修改成功!"
							})
							this.get_users()
						}
					})
					
				}else if(self.index == 2){
					self.userPayJson.wei_chat = 0
					self.userPayJson.businessAlipay = 0
					self.userPayJson.userAlipay = 0
				
					var data1 = {
						userPayJson:JSON.stringify(self.userPayJson)
					}
					self.Post3('/api/user/updateUserInfo',data1).then(res=>{
						if(res.code == 200){
							uni.showToast({
								title:"修改成功!"
							})
							this.get_users()
						}
					})
					
				}
				this.userPayJson = JSON.parse(uni.getStorageSync('userPayJson'))
				this.tixianshow = false
				
			}
		}
	}
</script>

<style scoped lang="less">
	page{
				background: #f7e5df;
				height: 100vh;
			}
			.title{
				/* padding: 40rpx; */
				font-weight: bold;
				font-size: 30rpx;
			}
			.header{
				/* background: -webkit-linear-gradient(#FCDA5E, #bfcc91); 
				
				background: -o-linear-gradient(#4bccb9, #bfcc91);
			
				background: -moz-linear-gradient(#4bccb9, #bfcc91); */
				
				background-image: linear-gradient(#ff5e31, #ff4a31, #faa390, #f7e5df);
				
				// height: 500rpx;
				width: 100%;
				
			}
			.op{
				box-shadow: 0px 0px 0px 0px;
			
				background-color:rgba(255,255,255,0.7);
			}
/* 			.op1{
				
				box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.4);
				background-color:rgba(255,255,255,0.1);
			
				font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
			} */
			.content{
				box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1);
				background-color:rgba(255,255,255,0.9);
				font-family: "Lucida Calligraphy", cursive, serif, sans-serif;
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
					background-color: #ff4a31;
					color: white;
            	}
            }
			.check-list{
				display: flex;
				view{
					margin-right: 40rpx;
					padding: 40rpx;
				}
			}
</style>