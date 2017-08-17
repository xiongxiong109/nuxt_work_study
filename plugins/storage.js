// 本地存储插件
import Vue from 'vue'
import VueLocalStorage from 'vue-ls'

const options = {
	namespace: 'NUXT_WORK_APP'
}

Vue.use(VueLocalStorage, options)

// export default ({app, store}) => {
// 	app.ls = new VueLocalStorage(options);
// }