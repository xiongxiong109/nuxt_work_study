<template>
	<div class="asset">
		<p>asset detail</p>
		<nuxt-child />
	</div>
</template>
<script type="text/javascript">
	export default {
		validate(to, from) {
			let { id } = to.params;
			return id;
		}
	}
</script>