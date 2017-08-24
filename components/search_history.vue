<template>
	<div class="history-wrap">
		<ul class="history-list">
			<li class="history-item">
				<span class="iconfont icon-time"></span>
				<p class="history-str">消愁</p>
				<span class="iconfont icon-close"></span>
			</li>
			<li class="history-item">
				<span class="iconfont icon-time"></span>
				<p class="history-str">消愁</p>
				<span class="iconfont icon-close"></span>
			</li>
		</ul>
		<div class="history-clear">
			<a href="javascript:void(0);">清除搜索记录</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'search-history'
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