import Vue from 'vue';
import Vuex from 'vuex';
import { ipcRenderer } from 'electron';
import forIn from 'lodash/forIn';

Vue.use(Vuex);

const state = {
  path: null,
  data: [],
  recentlyOpenedPaths: []
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
  },

  setValue(state, { key, value }) {
    const item = state.data.find(item => item.key === key);
    if (item) {
      state.data = state.data.map(item => (item.key === key ? { key, value } : item));
    } else {
      state.data = state.data.concat([{ key, value }]);
    }
  },

  deleteKey(state, key) {
    state.data = state.data.filter(item => item.key !== key);
  },

  setRecentlyOpenedPaths(state, paths) {
    state.recentlyOpenedPaths = paths;
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

  disconnectFromDatabase({ commit, state }) {
    const { status, message } = ipcRenderer.sendSync('leveldb-command', {
      command: 'close',
      params: {
        path: state.path
      }
    });

    if (status === 'failed') {
      return { success: false, error: message };
    }
    commit('setPath', null);
    commit('setData', []);
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
  },

  setValue({ state, commit }, { key, value }) {
    const { status, message } = ipcRenderer.sendSync('leveldb-command', {
      command: 'set-value',
      params: {
        key,
        value,
        path: state.path
      }
    });

    if (status === 'failed') {
      return { success: false, error: message };
    }

    const data = { key, value };
    commit('setValue', data);
    return { success: true, data };
  },

  deleteKey({ state, commit }, key) {
    const { status, data, message } = ipcRenderer.sendSync('leveldb-command', {
      command: 'del-value',
      params: {
        key,
        path: state.path
      }
    });

    if (status === 'failed') {
      return { success: false, error: message };
    }

    commit('deleteKey', key);
    return { success: true, data };
  },

  populateRecentlyOpened({ commit }) {
    const storedData = window.localStorage.getItem('recentlyOpened');
    if (storedData) {
      commit('setRecentlyOpenedPaths', JSON.parse(storedData));
    }
  },

  addToRecentlyOpened({ commit, state }, path) {
    const newPaths = [path, ...state.recentlyOpenedPaths.filter(p => p != path)];
    window.localStorage.setItem('recentlyOpened', JSON.stringify(newPaths));
    commit('setRecentlyOpenedPaths', newPaths);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
