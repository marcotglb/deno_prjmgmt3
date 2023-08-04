// import http from '../http';
//import { FilterMatchMode, FilterOperator } from "primevue/api";

// initial state
const state = () => ({
    jwt: null,
    firstname: 'guest firtsname',
    lastname: 'guest lastname',
    username: 'guest',
    id: 0
})

// getters
const getters = {
    jwt: state => state.jwt,
}


// mutations
const mutations = {
    setCredentials: (state, credentials) => {
        for (let prop in state)
            if (credentials[prop])
                state[prop] = credentials[prop];
    }
}

const actions = {

    setCredentials({ commit }, credentials) {
        console.log('store/credential. setCredentials(). credentials:', credentials)
        commit('setCredentials', credentials);

    },
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}