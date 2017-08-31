<template>
	<div class="music-page container">
		<tabbar v-model="curTab" class="top-tab" fixed>
			<tab-item id="search">搜索</tab-item>
			<tab-item id="range">排行</tab-item>
		</tabbar>
		<tab-container v-model="curTab" class="top-tab-container">
			<tab-container-item id="search">
				<search-ipt
					v-model="music.curSearch"
					@fetch_query="evt_fetch"
					@focus="evt_focus"
					@cancel="evt_clearCurSearch"
				></search-ipt>
				<search-history
					v-show="isShowHistory"
					:list="historyList"
					@search="evt_fetch"
					@delete="evt_delete"
					@clear-all="evt_clearStore"
				></search-history>
				<search-list
					:list="list"
				></search-list>
				<inline-loading v-show="isFetching">正在搜索...</inline-loading>
			</tab-container-item>
			<tab-container-item id="range">
				<h4>range</h4>
			</tab-container-item>
		</tab-container>
	</div>
</template>
<script type="text/javascript">
	import { mapState, mapActions } from 'vuex'
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
				storeKey: 'SEARCH_STR',
				curTab: 'search',
				// curPage: 1,
				// curSearch: '',
				list: [],
				historyList: [],
				isFetching: false,
				isFocused: false,
			}
		},
		computed: {
			isShowHistory() {
				// input框聚焦, 且没有正在搜索, 且有历史搜索结果
				return !this.isFetching && this.historyList.length && !this.list.length
			},
			...mapState(['music'])
		},
		mounted() {
			this.historyList = this.$ls.get(this.storeKey) || [];
		},
		methods: {
			/*
				isAppend, 用于分页
			*/
			evt_fetch(str, isAppend = false) {
				this['music/UPDATE_CUR'](str);
				this.saveSearchHistory(str);
				if (!this.isFetching) {
					this.isFetching = true;
					if (!isAppend) {
						this.list = [];
					}
					axios({
						url: 'http://local.qq.com:8088/qq_music/search',
						method: 'post',
						data: {
							q: str,
							p: this.music.curPage
						},
						timeout: 10000
					})
					.then(res => res.data)
					.then(rst => {
						let { keyword, song } = rst.data;
						// this.storekeyword // 本地存储
						if (isAppend) {
							this.list = [...this.list, ...song.list];
						} else {
							this.list = [...song.list];
						}
						this.isFetching = false;
					})
					.catch(err => {
						console.log(err);
						this.resetState();
					})
				}
			},
			saveSearchHistory(str = '') {
				let historyList = this.$ls.get(this.storeKey) || [];
				let alreadySearched = historyList.filter(item => item.str == str);
				/*
					新的搜索词, 且未达到存储上限5
				*/
				if (!alreadySearched.length) {
					if (historyList.length < 5) {
						historyList = [{str}, ...historyList];
					} else {
						historyList = [{str}, ...historyList.slice(0, historyList.length - 1)];
					}
					this.$ls.set(this.storeKey, historyList);
				}
				this.historyList = historyList;
			},
			resetState() {
				this.isFetching = false;
			},
			evt_focus() {
				this.isFocused = true;
			},
			evt_clearCurSearch() {
				this.isFocused = false;
				this.list = [];
			},
			evt_delete(idx) {
				this.historyList = [
					...this.historyList.slice(0, idx),
					...this.historyList.slice(idx + 1, this.historyList.length)
				];
				this.$ls.set(this.storeKey, this.historyList);
			},
			evt_clearStore() {
				this.historyList = [];
				this.$ls.set(this.storeKey, []);
			},
			...mapActions(['music/UPDATE_CUR'])
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
<style type="text/css">
	.music-page {
		height: 100%;
	}
	.top-tab-container, 
	.mint-tab-container-wrap {
		height: 100%;
	}
</style>