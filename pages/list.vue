<template>
	<div class="com-page">
		<h4>list page</h4>
		<p>msg: {{msg}}</p>
	</div>
</template>
<script type="text/javascript">
	import fetch from '~/middleware/fetch'

	export default {
		// 通过vue-meta来配置head的各种属性
		head: {
			title: '列表页'
		},
		// 页面的middleware可以通过这种方式使用
		middleware: ['fetch'],
		data: () => {
			return {
				msg: 'ok'
			}
		},
		// async data可以覆盖同步data的数据, 并且也会ssr到页面上来
		async asyncData(ctx) {
			let rst;
			try {
				rst = await ctx.fetch('/', {});
			} catch(err) {
				rst = err
			}
			return {
				msg: rst
			}
		}
	}
</script>