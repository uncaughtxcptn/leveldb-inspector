import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer } from 'electron';

Vue.use(Vuex);

const state = {
  path: null
};

const mutations = {
  setPath(state, path) {
    state.path = path;
  }
};

const actions = {
  connectToDatabase({ commit }, path) {
    const response = ipcRenderer.sendSync('leveldb-command', {
      command: 'connect',
      params: {
        path,
        createIfMissing: false,
        valueEncoding: 'text'
      }
    });

    if (response.status === 'success') {
      commit('setPath', path);
      return true;
    }
    return false;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
