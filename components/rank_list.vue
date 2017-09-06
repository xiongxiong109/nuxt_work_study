<template>
	<div class="rank-page">
		<scroller
			class="rank-scoller"
			v-if="isMounted"
			ref="rank_scroller"
			:on-refresh="evt_pull_refresh"
		>
			<ul class="rank-list">
				<li v-for="item in list">
					<div class="avatar">
						<img :src="item.picUrl">
					</div>
					<div class="info">
						<h3 class="title">{{item.topTitle}}</h3>
						<div class="info-rank">
							<p v-for="song, idx in item.songList">
								<span>{{idx + 1}}. {{song.songname}}</span>
								<span class="singer">{{song.singername}}</span>
							</p>
						</div>
					</div>
					<i class="rank-icon iconfont icon-ar"></i>
				</li>
			</ul>
		</scroller>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'rank-list',
		data: () => {
			return {
				isMounted: false,
				list: {}
			}
		},
		async created() {
			let fetchData = await this.fetch();
			if (fetchData && fetchData.list) {
				this.list = fetchData.list || [];
			}
		},
		mounted() {
			this.isMounted = true;
		},
		methods: {
			async fetch() {
				return new Promise((resolve, reject) => {
					axios.get('http://localhost:8088/qq_music/rank')
					.then(res => res.data)
					.then(rst => resolve({list: rst.data.topList}))
					.catch(err => reject(err))
				});
			},
			async evt_pull_refresh() {
				let fetchData = await this.fetch();
				if (fetchData && fetchData.list) {
					this.list = fetchData.list || [];
				}
				this.$refs.rank_scroller.finishPullToRefresh();
			}
		}
	}
</script>
<style type="text/css">
	@component rank {
		@descendent page {
			position: relative;
			height: 100%;
		}
		@descendent list {
			padding: 10px 15px 0;
			background-color: #f4f4f4;
			li {
				display: flex;
				align-items: center;
				background-color: #fff;
				border-radius: 4px;
				height: 100px;
				& + li {
					margin-top: 10px;
				}
				.avatar {
					size: 100px;
					img {
						size: 100%;
					}
				}
				.title {
					font-size: 16px;
				}
				.info {
					flex:1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					padding: 0 5px 0 10px;
					height: 100%;
					overflow: hidden;
					p {
						@utils-ellipsis;
					}
				}
				.singer {
					color: rgba(0,0,0,.5);
					&:before {
						content: '-';
						padding: 0 5px;
					}
				}
				.info-rank {
					padding-bottom: 10px;
				}
			}
		}
		@descendent icon {
			display: block;
			font-size: 14px;
			color: #ccc;
			padding-right: 5px;
		}
	}
</style>