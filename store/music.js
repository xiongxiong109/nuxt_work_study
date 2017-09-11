const UPDATE_CUR = 'UPDATE_CUR';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const FILL_LIST = 'FILL_LIST'; // 填充列表
const APPEND_LIST = 'APPEND_LIST'; // 分页填充
const ADD_PAGE = 'ADD_PAGE'; // 增加页数
const RESET_PAGE = 'RESET_PAGE'; // 分页重置
const CHANGE_TAB = 'CHANGE_TAB'; // 切换tab
export const state = () => {
	return {
		curPage: 1,
		curTab: 'search',
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
	},
	[ADD_PAGE](state) {
		state.curPage++;
	},
	[RESET_PAGE](state) {
		state.curPage = 1;
	},
	[CHANGE_TAB](state, tab) {
		state.curTab = tab;
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
	},
	[ADD_PAGE](state) {
		state.commit(ADD_PAGE);
	},
	[RESET_PAGE](state) {
		state.commit(RESET_PAGE);
	},
	[CHANGE_TAB](state, tab) {
		state.commit(CHANGE_TAB, tab);
	}
}