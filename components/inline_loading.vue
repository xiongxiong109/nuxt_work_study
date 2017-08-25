<template>
	<div class="il-loading-wrap">
		<spinner type="fading-circle" color="#47c88a" class="spinner"></spinner>
		<slot>{{loadingTxt}}</slot>
	</div>
</template>
<script type="text/javascript">
	import { Spinner } from 'mint-ui'
	export default {
		name: 'inline-loading',
		props: {
			loadingTxt: {
				type: String,
				default: () => 'loading...'
			}
		},
		components: {
			Spinner
		}
	}
</script>
<style type="text/css">
	.il-loading-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px 0;
		.spinner {
			padding-right: 10px;
		}
	}
</style>