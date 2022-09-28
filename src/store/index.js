import { createStore } from 'vuex'

export default createStore({
  state: {
    categories:[]
  },
  getters: {
    getCategories(state){
      return state.categories
    }
  },
  mutations: {
    setCategory(state, payload){
      state.categories = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
