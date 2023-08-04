// initial state
import http from '../http';

const apiBaseUrl = '/users'
// initial state
const state = () => ({
    elements: [],
    selected: {},
    root: null,
    navStack: [0],
    authorName: 'Marco Tagliabue'
})

// getters
const getters = {
    elements: state => state.elements,
    selected: state => state.selected,
    root: state => state.root,
    navStack: state => state.namStack
}

// actions


// mutations
const mutations = {
    setElements: (state, elements) => {
        state.elements = elements
    },
    setSelected: (state, selected) => {
        state.selected = selected
    },
    setRoot: (state, root) => {
        state.root = root
    },
    popTop: (state) => {
        if (state.navStack.length > 1) {
            state.navStack.pop()
            return true;
        }
        return false;
    },
    pushTop: (state, newroot) => {
        state.navStack.push(newroot)
    },
    patchElements: (state, updated) => {
        console.log('patchElements. updated=', updated)
        for (let u of updated) {
            let idx = state.elements.findIndex(el => (el.id == u.id));
            console.log('idx=', idx)
            state.elements[idx] = u;
        }
    },
    addElements: (state, updated) => {
        console.log('addElements. updated=', updated)
        for (let u of updated) {
            state.elements.push(u);
        }
    },
    deleteElements: (state, filter) => {
        console.log('deletedElements. filter=', filter)
        let undeleted = [];
        for (let e of state.elements) {
            let found = true;
            for (let f in filter) {
                if (e[f] != filter[f])
                    found = false;
            }
            if (!found)
                undeleted.push(e);
        }
        state.elements = undeleted;
    }
}

const actions = {

    async fetchElements({ commit, state }, filter) {
        console.log('Deliverable.get(filter). navStack=', state.navStack)

        filter = { top: state.navStack[state.navStack.length - 1] }
        try {
            let res = await http.get(apiBaseUrl, { params: filter });
            console.log(res)
            commit('setElements', res.data);
        } catch (err) {
            console.error(err)
        }
    },

    async patchElement({ commit }, { value, filter }) {
        console.log('updating deliverable...')

        http.patch(apiBaseUrl, { value: value, filter: filter })
            .then(res => {
                console.log(res);
                commit('patchElements', res.data);
                //commit('setSelected', value);

            }).catch(err => {
                console.error(err)
            })
    },
    async deleteElements({ commit }, filter) {
        console.log('deleting deliverables...')
        try {
            let res = await http.delete(apiBaseUrl, { data: filter })
            console.log(res);
            commit('deleteElements', filter);
            commit('setSelected', {});
        } catch (err) {
            console.error(err)
        }
    },
    async createElement({ commit }, value) {
        console.log('updating deliverable...')
        try {
            let res = await http.post(apiBaseUrl, value)
            console.log(res);
            commit('setSelected', res.data);
            commit('addElements', [res.data]);
        } catch (err) {
            console.error(err)
        }
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}