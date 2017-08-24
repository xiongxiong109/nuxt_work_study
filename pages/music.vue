<template>
	<div class="music-page container">
		<tabbar v-model="curTab" class="top-tab" fixed>
			<tab-item id="search">搜索</tab-item>
			<tab-item id="range">排行</tab-item>
		</tabbar>
		<tab-container v-model="curTab" class="top-tab-container">
			<tab-container-item id="search">
				<search-ipt></search-ipt>
			</tab-container-item>
			<tab-container-item id="range">
				<h4>range</h4>
			</tab-container-item>
		</tab-container>
	</div>
</template>
<script type="text/javascript">
	import { Tabbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
	import SearchIpt from '~/components/search_ipt'

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
			TabContainerItem,
			[SearchIpt.name]: SearchIpt
		}
	}
</script>