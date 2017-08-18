<template>
	<div class="com-page">
		<mt-button type="primary" @click="evt_goAuth" :disabled="disabled">授权登录</mt-button>
		<mt-button @click="$router.push('/github/explore')">explore</mt-button>
	</div>
</template>
<style type="text/css" scoped>
	.com-page {
		display: flex;
		padding: 10px;
		align-items: center;
		justify-content: space-around;
	}
</style>
<script type="text/javascript">
	import Vue from 'vue'
	import { Button } from 'mint-ui'
	export default {
		transition: 'slide-right',
		data: () => {
			return {
				disabled: false,
				client_id: 'ef10ea02c9f147746da6'
			}
		},
		methods: {
			evt_goAuth() {
				window.location.href = `
					http://github.com/login/oauth/authorize?client_id=${this.client_id}
				`;
				this.disabled = true;
			}
		},
		components: {
			[Button.name]: Button
		}
	}
</script>