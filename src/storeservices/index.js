import Vue from 'vue';
import Vuex from 'vuex';
import DateTanggalModule from './modules/DateTanggalModule';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    DateTanggalModule,
  },
  strict: debug,
});
