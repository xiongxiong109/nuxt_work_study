<template>
	<div class="rank-detail-page container">
		<h4 class="title">rank type detail</h4>
		<ul class="list">
			<li v-for="song in rank.songlist">
				<p>{{song.data.songname}}</p>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import axios from 'axios'

	export default {
		validate({params}) {
			let { id } = params;
			return id;
		},
		transition: 'slide-left',
		data: () => {
			return {
				rank: {}
			}
		},
		async asyncData({route}) {
			let { id } = route.params;
			let data = await axios.get(`http://localhost:8088/qq_music/toplist?id=${id}`)
			.then(rst => rst.data)
			.catch(err => {});
			return {rank: data};
		}
	}
</script>