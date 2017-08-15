<template>
	<div class="loading-layer" v-show="isLoading">
		<div class="loading">
			<i></i>
		</div>
	</div>
</template>
<style type="text/css">
	.loading-layer {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		/*background-color: rgba(0,0,0,.5);*/
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loading {
		width: 64px;
		height: 64px;
		border-radius: 4px;
		background-color: rgba(0,0,0,.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.loading i {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 2px solid #fff;
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-radius: 20px;
		animation: rotate .5s ease infinite;
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}
</style>
<script type="text/javascript">
	export default {
		data: () => {
			return {
				isLoading: false
			}
		},
		methods: {
			start() {
				this.isLoading = true;
			},
			finish() {
				this.isLoading = false;
			}
		}
	}
</script>