<template>
	<div class="music-page container">
		<tabbar v-model="curTab" class="top-tab" fixed>
			<tab-item id="search">搜索</tab-item>
			<tab-item id="range">排行</tab-item>
		</tabbar>
		<tab-container v-model="curTab" class="top-tab-container">
			<tab-container-item id="search">
				<search-ipt @fetch_query="evt_fetch"></search-ipt>
				<!-- <search-history></search-history> -->
				<inline-loading v-show="isFetching">正在搜索...</inline-loading>
				<search-list :list="list"></search-list>
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
	import SearchHistory from '~/components/search_history'
	import SearchList from '~/components/search_list'
	import InlineLoading from '~/components/inline_loading'
	import axios from 'axios'

	export default {
		head: {
			title: 'QQ音乐'
		},
		transition: 'slide-left',
		data: () => {
			return {
				curTab: 'search',
				curPage: 1,
				list: [],
				isFetching: false
			}
		},
		methods: {
			async evt_fetch(str) {
				if (!this.isFetching) {
					this.isFetching = true;
					axios({
						url: 'http://localhost:8088/qq_music/search',
						method: 'post',
						data: {
							q: str,
							p: this.curPage
						},
						timeout: 3000
					})
					.then(res => res.data)
					.then(rst => {
						let { keyword, song } = rst.data;
						// this.storekeyword // 本地存储
						this.list = [...this.list, ...song.list];
						console.log(this.list);
						this.isFetching = false;
					})
					.catch(err => {
						console.log(err);
						this.resetState();
					})
				}
			},
			resetState() {
				this.isFetching = false;
			}
		},
		components: {
			Tabbar,
			TabItem,
			TabContainer,
			TabContainerItem,
			[InlineLoading.name]: InlineLoading,
			[SearchIpt.name]: SearchIpt,
			[SearchHistory.name]: SearchHistory,
			[SearchList.name]: SearchList
		}
	}
</script>