<template>
	<div class="error-page">
		<h4>{{error.statusCode}}</h4>
		<p>error: {{error.message}}</p>
	</div>
</template>
<style type="text/css">
	html, body {
		height: 100%;
	}
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
<script type="text/javascript">
	export default {
		props: ['error'],
		mounted() {
			console.log(this.error);
		}
	}
</script>