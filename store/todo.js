// todo module
const ADD_ITEM = 'TODO/ADD_ITEM';
const UPDATE_GROUP = 'TODO/UPDATE_GROUP';

let _id = 0;
export const state = ()=> {
	return {
		list: []
	}
}

export const mutations = {
	[ADD_ITEM](state, info) {
		state.list = [...state.list, info];
	},
	[UPDATE_GROUP](state, group) {
		let arr = [];
		group.map(item => {
			arr.push({
				content: item,
				isFinished: false,
				id: _id++
			})
		});
		state.list = [...arr];
	}
}

export const actions = {
	// actions也会自动在前面添加文件名前缀做命名空间
	addItem(state, todoInfo) {
		state.commit(ADD_ITEM, {
			content: todoInfo,
			isFinished: false,
			id: _id++
		});
	},
	addGroup(state, groupList) {
		state.commit(UPDATE_GROUP, groupList);
	}
}