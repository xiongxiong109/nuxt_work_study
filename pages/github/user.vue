<template>
	<div class="container">
		<cell
			:value="uInfo.name"
			:label="group"
			class="cell-item"
			:is-link="true"
			:to="uInfo.html_url"
		>
			<img :src="uInfo.avatar_url" slot="icon"/>
		</cell>
		<cell title="public_repos" :value="uInfo.public_repos" class="cell-item"></cell>
		<cell
			title="followers"
			class="cell-item"
			:value="uInfo.followers"
		></cell>
	</div>
</template>
<style type="text/css">
	.cell-item {
		padding: 5px 10px;
		border-bottom: 1px solid #ddd;
	}
	.cell-item img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
	}
</style>
<script type="text/javascript">
	import Vue from 'vue'
	import { Cell } from 'mint-ui'

	export default {
		transition: 'slide-left',
		data: () => {
			return {
				uInfo: {}
			}
		},
		computed: {
			group() {
				return `${this.uInfo.company}-${this.uInfo.bio}`
			}
		},
		mounted() {
			this.uInfo = Vue.ls.get('github_user');
		},
		components: {
			Cell
		}
	}
</script>