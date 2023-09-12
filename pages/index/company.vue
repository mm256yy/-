<template>
	<view class="">
		<view class="" v-for="(item,index) in recommendedList" :key="index">
			<image :src="item.activityImgUrl" class="img" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				businessId: "",
				recommendedList: []
			}
		},
		onShow() {
			let self = this
			self.businessId = uni.getStorageSync('__ddminiStoreInfo')
			self.Get(`/api/plugs/searchPlugsRecommendedList?businessId=${self.businessId}`).then(res => {
				if (res.code == 200) {
					let list = res.body.list;
					self.recommendedList = list.filter(itm => itm.type === 'homecom');
					console.log(self.recommendedList)
				}
			})
		}
	}
</script>

<style scoped lang="less">
</style>