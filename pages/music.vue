<template>
	<div class="music-page container">
		<tabbar v-model="curTab" class="top-tab">
			<tab-item id="search">搜索</tab-item>
			<tab-item id="range">排行</tab-item>
		</tabbar>
	</div>
</template>
<script type="text/javascript">
	import { Tabbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'

	export default {
		head: {
			title: 'QQ音乐'
		},
		transition: 'slide-left',
		data: () => {
			return {
				curTab: 'search' 
			}
		},
		components: {
			Tabbar,
			TabItem,
			TabContainer,
			TabContainerItem
		}
	}
</script>