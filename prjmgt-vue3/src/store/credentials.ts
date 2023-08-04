import { defineStore } from "pinia";

interface Credentials {
  jwt: null,
  firstname: 'guest firtsname',
  lastname: 'guest lastname',
  username: 'guest',
  id: 0
}

export const useTodoStore = defineStore('ToDoStore', {
  state: () => ({
    credentials: {} as Credentials
  }),
  getters: {
    credentials: (state) => {
      return state.credentials;
    }
  },
  actions: {
    setCredentials(credentials) {
      console.log('store/credential. setCredentials(). credentials:', credentials)
      this.credentials = credentials;
    }
  }
})