<template>
	<div class="search-list" v-show="music.list.length">
		<scroller
			v-if="isMounted"
			ref="scroller"
			:on-infinite="evt_loadmore"
			loading-layer-color="#ccc"
		>
			<ul class="search-group">
				<li class="search-item" v-for="item in music.list" @click="evt_playSong(item.songmid)">
					<i class="icon"></i>
					<h6>{{item.songname}}</h6>
					<p><span v-for="singer in item.singer">{{singer.name}}</span></p>
				</li>
			</ul>
		</scroller>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'search-list',
		data: () => {
			return {
				/*
					插件入坑, scroller插件需要获取document与body元素, 也就是说
					这一类的插件是属于只在浏览器中使用的插件
					所以需要在config里面设置ssr: false
					否则的话会报错
					但是这个插件又是直接以标签的形式使用的, 因为设置了ssr为false
					那么template中如果又包含了这个组件, 就会报两端渲染不一致的错误
					所以在这里设置了一个isMounted, 在组件走到生命周期mounted的阶段
					也就是挂载到了浏览器dom的阶段的时候, 再将scroller渲染出来
				*/
				isMounted: false
			}
		},
		computed: {
			...mapState(['music'])
		},
		watch: {
			list(v) {
				if (this.$refs.scroller) {
					this.$refs.scroller.resize();
					this.$refs.scroller.finishInfinite(false);	
				}
			}
		},
		mounted() {
			this.isMounted = true;
		},
		methods: {
			fetch() {
				axios({
					url: 'http://local.qq.com:8088/qq_music/search',
					method: 'post',
					data: {
						q: this.music.curSearch,
						p: this.music.curPage + 1
					},
					timeout: 10000
				})
				.then(res => res.data)
				.then(rst => {
					let { list } = rst.data.song;
					if (list.length) {
						this['music/ADD_PAGE']();
						this['music/APPEND_LIST'](list);
						this.$refs.scroller.finishInfinite(false);
					} else { // 没有更多了
						// this['music/RESET_PAGE']();
						this.$refs.scroller.finishInfinite(true);
					}
				})
				.catch(err => console.log(err))
			},
			evt_playSong(songmid) {
				location.href = `http://local.qq.com:8088/qq_music/song?id=${songmid}`
			},
			evt_loadmore() {
				let { length } = this.music.list;
				if (length) {
					this.fetch();
				} else {
					let { scroller } = this.$refs;
					this.$refs.scroller.resize();
					scroller.finishInfinite(false);
				}
			},
			...mapActions([
				'music/APPEND_LIST',
				'music/ADD_PAGE',
				'music/RESET_PAGE'
			])
		}
	}
</script>
<style type="text/css">
	@component search {
		@descendent list {
			position: relative;
			height: 85%;
			overflow: hidden;
		}
		@descendent item {
			height: 50px;
			padding-left: 50px;
			position: relative;
			border-top: 1px solid #ededed;
			background-color: #fff;
			.icon {
				position: absolute;
				left: 25px;
				top: 25px;
				width: 25px;
				height: 25px;
				background: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/search_sprite.png?max_age=19830212&d=20151105145423) center no-repeat;
				background-size: contain;
				transform: translate(-50%, -50%);
			}
			h6 {
				color: #555;
				font-size: 14px;
			}
			p {
				color: #ccc;
				font-size: 12px;
			}
		}
	}
</style>