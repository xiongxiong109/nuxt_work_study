<template>
	<div class="container">
		<h4>list page</h4>
		<p>msg: {{msg}}</p>
		<input type="text" v-model="curItem">
		<button @click="evt_addTodo">add todo</button>
		<router-link to="/">back to home</router-link>
		<ul v-if="todo.list.length">
			<li v-for="item in todo.list">{{item.content}}</li>
		</ul>
		<p>oid: {{$route.query.oid}}</p>
		<p>order: {{$route.params.order}}</p>
	</div>
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
		// 编程式过渡动效
		transition: 'slide-left',
		// 验证url的合法性, 这些注入方法都是获取的ctx上下文
		validate({ query, params }) {
			let { oid } = query;
			// console.log(params); // 路由页面动态生成, 通过编程式导航可以携带params参数过来
			return oid || params.order;
		},
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