// fetch middleware
/*
	nuxt middleware's param is a context of the vue page
	it contains route、store、env、req、res and so on
*/
import axios from 'axios'

const baseUrl = 'http://localhost:8088/nuxt/mock';

export default (ctx) => {
	ctx.fetch = async (
		path = '/',
		params = {} 
	) => new Promise((resolve, reject) => {
		axios({
			url: `${baseUrl}${path}`,
			method: 'post',
			body: params,
			timout: 3000
		})
		.then(res => resolve(res.data))
		.catch(err => reject(err));
	});
}