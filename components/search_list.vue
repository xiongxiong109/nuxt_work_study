<template>
	<div class="search-list" v-show="list.length">
		<ul class="search-group">
			<li class="search-item" v-for="item in list" @click="evt_playSong(item.songmid)">
				<i class="icon"></i>
				<h6>{{item.songname}}</h6>
				<p><span v-for="singer in item.singer">{{singer.name}}</span></p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name: 'search-list',
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			evt_playSong(songmid) {
				location.href = `http://local.qq.com:8088/qq_music/song?id=${songmid}`
			}
		}
	}
</script>
<style type="text/css">
	@component search {
		@descendent item {
			height: 50px;
			padding-left: 50px;
			position: relative;
			border-top: 1px solid #ededed;
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