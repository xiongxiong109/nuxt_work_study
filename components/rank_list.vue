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
							<p v-for="song in item.songList">
								<span>{{song.singername}}</span>
								<span>{{song.songname}}</span>
							</p>
						</div>
					</div>
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
		created() {
			axios.get('http://localhost:8088/qq_music/rank')
			.then(res => res.data)
			.then(rst => this.list = rst.data.topList || []);
		},
		mounted() {
			this.isMounted = true;
		},
		methods: {
			evt_pull_refresh() {
				setTimeout(() => {
					this.$refs.rank_scroller.finishPullToRefresh();
				}, 1e3);
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
			padding: 10px 15px 56px;
			background-color: #f4f4f4;
			li {
				display: flex;
				align-items: center;
				background-color: #fff;
				border-radius: 4px;
				& + li {
					margin-top: 10px;
				}
				.avatar {
					size: 100px;
					img {
						size: 100%;
					}
				}
				.info {
					flex:1;
					padding: 0 20px 0 10px;
					overflow: hidden;
					p {
						@utils-ellipsis;
					}
				}
			}
		}
	}
</style>