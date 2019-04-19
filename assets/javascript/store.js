import Vue from "vue"
import Vuex from "vuex"
import defaultState from './default-state.js'
import uuid from './uuid.js'
import { ADD_STATE, MOVE_STATE, UPDATE_STATE, FOCUS_STATE } from './mutation-types.js'
import { CONTINUE_UPDATE_STATE } from './action-types.js'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const getters = {
  findState: state => id =>
    state.states.find(state => state.id === id),
  stateNamed: state => name =>
    state.states.find(state => state.name === name),
  focusedState: (state) =>
    getters.findState(state)(state.focusedStateId),
  focusedStateName (state) {
    const focused = getters.focusedState(state)
    return focused ? focused.name : undefined
  },
  isFocused: vuexState => ({ id }) =>
    id === vuexState.focusedStateId
}

let renamingTimeout = false

const actions = {
  [CONTINUE_UPDATE_STATE] ({ commit }, payload) {
    if (renamingTimeout) {
      window.clearTimeout(renamingTimeout)
    }

    renamingTimeout = window.setTimeout(
      () => commit(UPDATE_STATE, payload),
      100
    )
  }
}

const store = new Vuex.Store({
  // plugins: [createLogger()],
  state: { ...defaultState },
  mutations: {
    [ADD_STATE] (vuexState, newState) {
      vuexState.states.push({
        ...defaultState.states[0],
        id: uuid(),
        ...newState
      })
    },
    [UPDATE_STATE] (vuexState, payload) {
      const state = getters.findState(vuexState)(payload.id)

      if (state) {
        delete payload.id
        Object.assign(
          state,
          payload
        )
      }
    },
    [MOVE_STATE] (vuexState, { id, to }) {
      const state = getters.findState(vuexState)(id)

      if (state) {
        state.network.position = to
      }
    },
    [FOCUS_STATE] (vuexState, id) {
      vuexState.focusedStateId =
        (getters.findState(vuexState)(id))
          ? id
          : null
    }
  },
  getters,
  actions
})

export default store
