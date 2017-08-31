const UPDATE_CUR = 'UPDATE_CUR';

export const state = () => {
	return {
		curPage: 1,
		curSearch: '',
		list: [],
		historyList: [],
		isFetching: false
	}
}

export const mutations = {
	[UPDATE_CUR](state, str) {
		state.curSearch = str;
	}
}

export const actions = {
	[UPDATE_CUR](state, str) {
		state.commit(UPDATE_CUR, str);
	}
}