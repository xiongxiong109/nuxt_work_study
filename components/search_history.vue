<template>
	<div class="history-wrap">
		<ul class="history-list">
			<li class="history-item" v-for="(item,idx) in list">
				<span class="iconfont icon-time"></span>
				<p class="history-str" @click="evt_search(item.str)">{{item.str}}</p>
				<span class="iconfont icon-close" @click="evt_delete(idx)"></span>
			</li>
		</ul>
		<div class="history-clear">
			<a href="javascript:void(0);" @click="evt_clearall">清除搜索记录</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'search-history',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			evt_search(str) {
				this.$emit('search', str);
			},
			evt_delete(str) {
				this.$emit('delete', str);
			},
			evt_clearall() {
				this.$emit('clear-all');
			}
		}
	}
</script>
<style type="text/css">
	@component history {
		@descendent item {
			border-top: 1px solid #ededed;
			padding: 0 10px;
			height: 44px;
			line-height: 44px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 16px;
			.icon-close {
				display: block;
				width: 20px;
				height: 20px;
				line-height: 20px;
				text-align: center;
			}
		}
		@descendent str {
			flex: 1;
			padding: 0 10px;
			@utils-ellipsis;
		}
		@descendent clear {
			text-align: center;
			font-size: 12px;
			a {
				display: inline-block;
				line-height: 44px;
				color: #47c88a;
			}
		}
	}
</style>