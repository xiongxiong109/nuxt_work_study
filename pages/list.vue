<template>
	<transition name="slide">
		<div class="com-page">
			<h4>list page</h4>
			<p>msg: {{msg}}</p>
			<input type="text" v-model="curItem">
			<button @click="evt_addTodo">add todo</button>
			<ul v-if="todo.list.length">
				<li v-for="item in todo.list">{{item.content}}</li>
			</ul>
		</div>
	</transition>
</template>
<script type="text/javascript">
	import { mapActions, mapState } from 'vuex'

	import fetch from '~/middleware/fetch'

	export default {
		// 通过vue-meta来配置head的各种属性
		head: {
			title: '列表页'
		},
		// 页面的middleware可以通过这种方式使用
		middleware: ['fetch'],
		transition: 'slide',
		// layout: 'scroll_page',
		data: () => {
			return {
				msg: 'ok',
				curItem: ''
			}
		},
		computed: {
			// store下以.js的文件名作为默认的module名
			...mapState(['todo'])
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
		},
		// 异步的fetch方法, 用于页面初始化时填充vuex的store
		async fetch(ctx) {
			let rst, list;
			let { store } = ctx;
			try {
				rst = await ctx.fetch('/todo');
				list = rst.list;
			} catch(err) {
				console.log(err);
				list = [];
			}
			store.dispatch('todo/addGroup', list);
		},
		methods: {
			evt_addTodo() {
				if (this.curItem) {
					this['todo/addItem'](this.curItem);
					this.curItem = '';
					this.addCounter();
				}
			},
			...mapActions(['todo/addItem', 'todo/addGroup', 'addCounter'])
		}
	}
</script>