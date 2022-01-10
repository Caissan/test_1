let ids = {};
let names = {};
let searchIds = [];

const searchLetterCount = 2;

const state = () => ({
	list: [],
	search: "",
	history: [],
	sortDestination: undefined
});

const getters = {
	USERS(state) {
		const users = state.list.filter(item => {
			if (item.isFavorite) return false;
			if (state.search.length > searchLetterCount) return item.inSearch === true;
			return true;
		});
		if (state.sortDestination) users.sort((a, b) => state.sortDestination === "asc"
			? a.wordsFound - b.wordsFound
			: b.wordsFound - a.wordsFound);
		return users;
	},
	FAVORITES(state) {
		return state.list.filter(item => item.isFavorite);
	},
};

const mutations = {
	LIST(state, value) {
		state.list = value;
	},
	SEARCH(state, value) {
		state.search = value;
	},
	HISTORY(state, value) {
		state.history = value;
	},
	SORT_DESTINATION(state, value) {
		state.sortDestination = value;
	},
};

const actions = {
	async INIT({ state, commit }) {
		if (state.list.length) return;
		try {
			const response = await fetch("http://localhost:3001/api/items?count=50000");
			const list = await response.json();
			commit("LIST", list);
			ids = toIds(list);
			names = toNames(list);
			console.log("Данные загружены");
		} catch (e) {
			console.log("Ошибка загружки данных");
		}
	},
	ADD_TO_FAVORITE({ state, commit }, id) {
		if (ids[id] !== "undefined") {
			state.list[ids[id]].isFavorite = true;
			commit("LIST", state.list);

			state.history.push({
				id: id,
				type: "added",
				name: state.list[ids[id]].name,
				action: "added to favorites",
				date: (new Date).toString()
			});
			commit("HISTORY", state.history);
		}
	},
	REMOVE_FROM_FAVORITE({ state, commit }, id) {
		if (ids[id] !== "undefined") {
			state.list[ids[id]].isFavorite = false;
			commit("LIST", state.list);

			state.history.push({
				id: id,
				type: "removed",
				name: state.list[ids[id]].name,
				action: "remove from favorites",
				date: (new Date).toString()
			});
			commit('HISTORY', state.history);
		}
	},
	SET_SEARCH({ state, commit }, value) {
		commit("SEARCH", value);

		searchIds.forEach(id => state.list[id].inSearch = false);
		searchIds.splice(0, searchIds.length);

		if (value.length > searchLetterCount) {
			const namesList = Object.keys(names).filter(name => name.includes(value));

			namesList.forEach(name => {
				names[name].forEach(index => {
					state.list[index].inSearch = true;
					state.list[index].wordsFound = state.list[index].wordsFound
						? state.list[index].wordsFound + 1
						: 1;
					searchIds.push(index);
				});
			});
		}

		commit("LIST", state.list);
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};

function toIds(list) {
	const ret = {};
	list.forEach((item, index) => ret[item.id] = index);
	return ret;
}

function toNames(list) {
	const ret = {};
	list.forEach((item, index) => {
		if (!Array.isArray(ret[item.name])) ret[item.name] = [];
		ret[item.name].push(index);

		// Закоментировать для отключения поиска по вложениям
		if (item.items) {
			item.items.forEach(item2 => {
				if (!Array.isArray(ret[item2.name])) ret[item2.name] = [];
				ret[item2.name].push(index);
			});
		}
	});
	return ret;
}