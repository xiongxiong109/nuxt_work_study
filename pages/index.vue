<template>
  <section class="container">
    <router-link to="list?oid=123">to list</router-link>
    <span>编程式导航</span>
    <p>
    	<span>{{counter}}</span>
    	<button @click="evt_addCounter">add</button>
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
			...mapActions(['addCounter'])
		}
	}
</script>
