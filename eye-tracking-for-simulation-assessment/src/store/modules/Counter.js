'use strict'

const state = {
    count: 0,
}

const mutations = {
    increment(state) {
        state.count++
    },
    decrement(state) {
        state.count--
    },
}

const actions = {
    increment(store) {
        store.commit('increment')
    },
    decrement(store) {
        store.commit('decrement')
    },
}

export default {
    state,
    mutations,
    actions,
}
