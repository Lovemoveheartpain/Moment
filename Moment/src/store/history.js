export default {
    state: {
        searchHistory: JSON.parse(
            window.localStorage.getItem("historyList") || "[]"
        )
    },
    mutations: {
        setHistory(state, value) {
            if (!value) {
                return;
            }
            let index = state.searchHistory.findIndex(element => element === value);
            if (index == -1) {
                if (state.searchHistory.length === 5) {
                    state.searchHistory.pop();
                }
                state.searchHistory.unshift(value);
            } else {
                state.searchHistory.splice(index, 1);
                state.searchHistory.unshift(value);
            }
            window.localStorage.setItem("historyList", JSON.stringify(state.searchHistory));
        },
        removeHistory(state, value) {
            state.searchHistory = value;
            window.localStorage.setItem("historyList", JSON.stringify(state.searchHistory));
        }
    },
    actions: {

    },
    modules: {

    }
}