const UPDATE_CUR = 'UPDATE_CUR';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const FILL_LIST = 'FILL_LIST'; // 填充列表
const APPEND_LIST = 'APPEND_LIST'; // 分页填充

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
	[UPDATE_CUR](state, str = '') {
		state.curSearch = str;
	},
	[TOGGLE_FETCHING](state, isFetch = true) {
		state.isFetching = isFetch;
	},
	[FILL_LIST](state, list = []) {
		state.list = [...list];
	},
	[APPEND_LIST](state, list = []) {
		state.list = [...state.list, ...list];
	}
}

export const actions = {
	[UPDATE_CUR](state, str) {
		state.commit(UPDATE_CUR, str);
	},
	[TOGGLE_FETCHING](state, isFetch) {
		state.commit(TOGGLE_FETCHING, isFetch);
	},
	[FILL_LIST](state, list) {
		state.commit(FILL_LIST, list);
	},
	[APPEND_LIST](state, list) {
		state.commit(APPEND_LIST, list);
	}
}