/*
	模块方式下
	store目录的index.js会是store的根模块
*/
export const state = () => {
	return {
		counter: 0,
		lang: 'cn' // 国际化
	}
}
export const mutations = {
	add(state) {
		state.counter++
	},
	changeLang(state, lang) {
		state.lang = lang || 'cn'
	}
}

export const actions = {
	addCounter(state) {
		state.commit('add');
	},
	changeLang(state, lang) {
		state.commit('changeLang', lang)
	}
}