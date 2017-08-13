<template>
	<div class="com-page">
		<h4>list page</h4>
		<p>isDev: {{asyncMsg}}</p>
		<p>msg: {{msg}}</p>
	</div>
</template>
<script type="text/javascript">

	export default {
		data: () => {
			return {
				msg: 'ok'
			}
		},
		asyncData: (ctx) => {
			return {
				asyncMsg: ctx.isDev
			}
		}
	}
</script>