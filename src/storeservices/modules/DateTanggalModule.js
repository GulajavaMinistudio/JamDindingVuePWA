/* eslint-disable no-shadow */
// store module untuk tanggal dan pengolahan tanggal
import TanggalParsers from '@/parsers/TanggalParsers';

// state
const state = {
  tanggal: '',
};

// getters
const getters = {
  getTanggalBaku(state) {
    return state.tanggal;
  },
};

// actions
const actions = {
  getTanggalbakuActions({
    commit,
  }) {
    TanggalParsers.parseDataTanggal().then((result) => {
      commit('setDataTanggalState', {
        data: result,
      });
    })
      .catch(() => {
        commit('setDataTanggalState', {
          data: 'Tanggal Belum Tersedia',
        });
      });
  },
};

// mutations
const mutations = {
  setDataTanggalState(state, {
    data,
  }) {
    const stateTanggal = state;
    stateTanggal.tanggal = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
