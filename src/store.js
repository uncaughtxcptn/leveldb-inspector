import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer } from 'electron';
import forIn from 'lodash/forIn';

Vue.use(Vuex);

const state = {
  path: null,
  data: []
};

const getters = {
  isConnected(state) {
    return state.path !== null;
  }
};

const mutations = {
  setPath(state, path) {
    state.path = path;
  },

  setData(state, data) {
    state.data = data;
  }
};

const actions = {
  connectToDatabase({ commit }, path) {
    const { status, message } = ipcRenderer.sendSync('leveldb-command', {
      command: 'connect',
      params: {
        path,
        createIfMissing: false,
        valueEncoding: 'text'
      }
    });

    if (status === 'failed') {
      return { success: false, error: message };
    }
    commit('setPath', path);
    return { success: true };
  },

  getDatabaseContents({ state, commit }) {
    const { status, data, message } = ipcRenderer.sendSync('leveldb-command', {
      command: 'get-key-values',
      params: {
        path: state.path
      }
    });

    if (status === 'failed') {
      return { success: false, error: message };
    }

    const keyValues = [];
    forIn(data, (value, key) => keyValues.push({ key, value }));

    commit('setData', keyValues);
    return { success: true, data };
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
