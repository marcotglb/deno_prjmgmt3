//import {vue} from 'vue'
import { createStore, createLogger } from 'vuex'

import credential from './modules/Credential';
import deliverable from './modules/Deliverable';
import user from './modules/User';

const debug = process.env.NODE_ENV !== 'production'
export const store = createStore({
  modules: {
    credential,
    deliverable,
    user
  },
  //strict: debug,
  plugins: debug ? [createLogger()] : []
})

//vue.prototype.$store = store;

export default store;

