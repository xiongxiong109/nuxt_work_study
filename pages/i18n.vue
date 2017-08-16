<template>
	<div class="container">
		<h4>国际化i18n</h4>
		<nuxt-child/>
	</div>
</template>
<script type="text/javascript">
	export default {
		transition: 'slide-left',
		middleware: ['i18n'] // middleware可以直接挂在单独的页面下
	}
</script>