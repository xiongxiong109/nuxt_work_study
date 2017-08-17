<template>
	<div class="container">
		<p v-if="authInfo && authInfo.err">
			<br>
			{{authInfo}}
			<br>
			<router-link to="/github/login">重新授权</router-link>
		</p>
		<div class="auth-loading" v-else>
			<spinner type="double-bounce" color="#26a2ff"/>
			<p>登录中, 请稍候</p>
		</div>
	</div>
</template>
<style type="text/css">
	.auth-loading {
		width: 150px;
		height: 150px;
		margin: 30px auto;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	p {
		word-break: break-all;
		padding: 10px;
	}
</style>
<script type="text/javascript">
	import Vue from 'vue'
	import { Spinner } from 'mint-ui'
	import { fetch } from '~/middleware/fetch'

	export default {
		// 检验授权合法性, github授权后会发送code到url上
		validate({query}) {
			let { code } = query;
			return code;
		},
		data: () => {
			return {
				authInfo: ''
			}
		},
		middleware: ['fetch'],
		// 不能使用asyncData方法, asyncData会有服务端渲染, 服务端渲染时无法拿到localstorage和window对象
		async mounted() {
			let { code } = this.$route.query;
			let rst = await fetch('/github/auth', {code});
			if (rst.err) {
				this.authInfo = rst;
			} else {
				Vue.ls.set('github_user', rst);
				this.$router.replace('/github/user');
			}
		},
		components: {
			Spinner
		}
	}
</script>