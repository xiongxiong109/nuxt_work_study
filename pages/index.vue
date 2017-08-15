<template>
  <section class="container">
    <router-link to="list?oid=123">to list</router-link>
    <p @click="evt_go">编程式导航</p>
    <p>
    	<span>{{counter}}</span>
    	<button @click="evt_addCounter">add</button>
    </p>
    <p>
    	<router-link to="detail/asset/321?type=1">detail/asset/321?type=1</router-link>
    </p>
    <p>
    	<router-link to="detail/asset">detail/asset</router-link>
    </p>
  </section>
</template>
<script type="text/javascript">
	import { mapState, mapActions } from 'vuex'

	export default {
		head: {
			title: 'home page',
			meta: [
				{name: 'keyword', content: 'nuxt work, vue, ssr'}
			]
		},
		transition: 'slide',
		computed: {
			...mapState(['counter'])
		},
		methods: {
			evt_addCounter() {
				this.addCounter();
			},
			evt_go() {
				this.$router.push({
					name: 'list',
					query: {
						oid: 13213213
					},
					params: {
						order: 10
					}
				})
			},
			...mapActions(['addCounter'])
		}
	}
</script>
