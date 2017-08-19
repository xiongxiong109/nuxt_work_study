<template>
	<div class="container">
		<div class="search-group">
			<input
				class="form-ipt"
				type="text"
				placeholder="输入搜索的project"
				v-model="queryStr"
				@focus="evt_focus"
			/>
			<mt-button v-show="isShowBtn" @click="evt_search">搜索</mt-button>
		</div>
		<div class="search-list">
			<div class="search-loading" v-show="isSearching" >
				<spinner />
			</div>
			<div class="search-rst" v-show="rst.length">
				<cell
					v-for="item in rst"
					:title="item.full_name"
					:label="'star : ' + item.stargazers_count.toString()"
					:is-link="true"
					:to="item.html_url"
					:key="item.id"
					/>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0
	}
	.search-group {
		display: flex;
		align-items: center;
		background-color: #eee;
		height: 34px;
		padding: 5px 8px;
	}
	.search-loading {
		text-align: center;
		padding: 18px 0;
	}
	.search-loading span {
		display: inline-block;
	}
	.form-ipt {
		flex: 1;
		border: none;
		height: 100%;
		outline: none;
		box-sizing: border-box;
		padding: 0 5px;
		border-radius: 4px;
	}
	.search-group .mint-button {
		height: 30px;
		font-size: 14px;
		margin-left: 8px;
	}
</style>
<script type="text/javascript">
	import { Cell, Button, Spinner } from 'mint-ui'
	import { fetch } from '~/middleware/fetch'
	export default {
		transition: 'slide-left',
		data: () => {
			return {
				queryStr: '',
				isShowBtn: false,
				isSearching: false,
				rst: []
			}
		},
		watch: {
			queryStr(v) {
				if (!v) {
					this.isShowBtn = false;
				} else {
					this.isShowBtn = true;
				}
			}
		},
		methods: {
			evt_focus() {
				this.isShowBtn = true;
			},
			async evt_search() {
				let rst;
				this.isSearching = true;
				this.isShowBtn = false;
				this.rst = [];
				try {
					rst = await fetch('/github/search', {queryStr: this.queryStr});
				} catch (err) {
					rst = err;
				}
				if (!rst.err) {
					this.rst = rst.items;
				}
				this.isSearching = false;
			}
		},
		components: {
			Cell,
			Spinner,
			[Button.name]: Button
		}
	}
</script>