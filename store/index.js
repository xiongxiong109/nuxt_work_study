/*
	模块方式下
	store目录的index.js会是store的根模块
*/
export const state = () => {
	return {
		counter: 0
	}
}
export const mutations = {
	add(state) {
		state.counter++
	}
}

export const actions = {
	addCounter(state) {
		state.commit('add');
	}
}