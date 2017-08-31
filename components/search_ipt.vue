<template>
	<div class="search-container">
		<div class="search-wrap">
			<form @submit.prevent="evt_goSearch" class="search-form">
				<span class="iconfont icon-search"></span>
				<input type="text" @focus.stop="evt_show" v-model="queryStr" placeholder="搜索歌曲、歌单、专辑">
				<span class="iconfont icon-close-fill" v-show="queryStr" @click="evt_clearQueryStr"></span>
			</form>
		</div>
		<a v-show="showCancel" @click="evt_cancel" href="javascript:void(0);" class="search-cancel">取消</a>
	</div>
</template>
<script type="text/javascript">
	import { mapActions } from 'vuex'

	export default {
		data: () => {
			return {
				showCancel: false,
				queryStr: ''
			}
		},
		props: {
			value: {
				type: String,
				default: () => ''
			}
		},
		watch: {
			value(v) {
				console.log(v);
				this.queryStr = v;
			}
		},
		name: 'search-ipt',
		methods: {
			evt_goSearch() {
				if (this.queryStr) {
					this.$emit('fetch_query', this.queryStr);
				}
			},
			evt_show() {
				this.showCancel = true;
				this.$emit('focus');
			},
			evt_cancel() {
				this.evt_clearQueryStr();
				this.showCancel = false;
				this.$emit('cancel');
			},
			evt_clearQueryStr() {
				this.queryStr = '';
				this['music/UPDATE_CUR']('');
			},
			...mapActions(['music/UPDATE_CUR'])
		}
	}
</script>
<style type="text/css">
	@component search {
		@descendent container {
			color: #555;
			background-color: #f4f4f4;
			padding: 10px;
			display: flex;
			align-items: center;
		}
		@descendent wrap {
			background-color: #fff;
			position: relative;
			border-radius: 3px;
			padding: 8px 12px 8px 15px;
			flex: 1;
		}
		@descendent form {
			display: flex;
			align-items: center;
			input {
				border: none;
				height: 20px;
				color: rgba(0,0,0,.3);
				font-size: 14px;
				flex: 1;
				color: #555;
			}
			.iconfont {
				font-size: 14px;
				padding-right: 2px;
			}
		}
		@descendent cancel {
			color: inherit;
			padding: 0 10px;
	    font-size: 14px;
	    height: 36px;
	    line-height: 36px;
		}
	}
</style>