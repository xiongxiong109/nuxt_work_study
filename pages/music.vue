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
				<search-list></search-list>
				<inline-loading v-show="music.isFetching">正在搜索...</inline-loading>
			</tab-container-item>
			<tab-container-item id="range">
				<rank-list></rank-list>
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
	import RankList from '~/components/rank_list'
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
				// list: [],
				historyList: [],
				// isFetching: false,
				isFocused: false,
			}
		},
		computed: {
			isShowHistory() {
				// input框聚焦, 且没有正在搜索, 且有历史搜索结果
				return !this.music.isFetching && this.historyList.length && !this.music.list.length
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
				if (!this.music.isFetching) {
					this['music/TOGGLE_FETCHING'](true);
					if (!isAppend) {
						this['music/FILL_LIST']([]);
						this['music/RESET_PAGE'](); // 分页重置
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
							this['music/APPEND_LIST'](song.list);
							this['music/ADD_PAGE'](); // 分页+1
						} else {
							this['music/FILL_LIST'](song.list);
						}
						this['music/TOGGLE_FETCHING'](false);
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
				this['music/TOGGLE_FETCHING'](false);
			},
			evt_focus() {
				this.isFocused = true;
			},
			evt_clearCurSearch() {
				this.isFocused = false;
				this['music/FILL_LIST']([]);
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
			...mapActions([
				'music/UPDATE_CUR',
				'music/TOGGLE_FETCHING',
				'music/FILL_LIST',
				'music/APPEND_LIST',
				'music/ADD_PAGE',
				'music/RESET_PAGE'
			])
		},
		components: {
			Tabbar,
			TabItem,
			TabContainer,
			TabContainerItem,
			[InlineLoading.name]: InlineLoading,
			[SearchIpt.name]: SearchIpt,
			[SearchHistory.name]: SearchHistory,
			[SearchList.name]: SearchList,
			[RankList.name]: RankList
		}
	}
</script>
<style type="text/css">
	body {background-color: #f4f4f4;}
	.music-page {
		height: 100%;
	}
	.top-tab-container, 
	.mint-tab-container-wrap {
		height: 100%;
	}
</style>