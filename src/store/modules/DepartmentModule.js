export default {
    namespaced: true,
    state: {
        tableAllData: [],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    },
    getters: {
    },
    mutations: {
        SET_TABLE_DATA(state, val) {
            state.tableAllData = val
            state.tableData = val.slice(
                (state.currentPage - 1) * state.pageSize,
                state.currentPage * state.pageSize
            );
            state.total = val.length
        },
        SET_PAGESIZE(state, val){
            state.pageSize = val
        },
        SET_CURRENTPAGE(state, val){
            state.currentPage = val
        },
    },
    actions: {
    },
    modules: {
    }
}