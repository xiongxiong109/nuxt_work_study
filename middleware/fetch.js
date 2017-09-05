// fetch middleware
/*
	nuxt middleware's param is a context of the vue page
	it contains route、store、env、req、res and so on
*/
import axios from 'axios'

export const fetch = async (
		path = '/',
		params = {},
		baseUrl = 'http://localhost:8088/nuxt/mock'
	) => new Promise((resolve, reject) => {
		axios({
			url: `${baseUrl}${path}`,
			method: 'post',
			data: params,
			timout: 3000
		})
		.then(res => resolve(res.data))
		.catch(err => reject(err));
	});

export default (ctx) => {
	ctx.fetch = fetch
}