<template>
	<div class="container">
		<mt-header :title="title"/>
		<nuxt-child />
	</div>
</template>
<style type="text/css">
	.com-page {
		padding: 10px;
	}
</style>
<script type="text/javascript">
	import { Header } from 'mint-ui'
	export default {
		data: () => {
			return {
				title: 'github open apis实例'
			}
		},
		transition: 'slide-left',
		components: {
			[Header.name]: Header,
		}
	}
</script>