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
    <router-link to="i18n/en/test">i18n en</router-link>
    <router-link to="i18n/cn/test">i18n cn</router-link>
    <router-link to="github/login">github open api</router-link>
    <router-link to="music">QQ_Music</router-link>
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
		computed: {
			...mapState(['counter'])
		},
		transition: 'slide-right',
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
