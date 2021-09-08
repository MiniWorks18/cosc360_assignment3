import { createStore } from 'vuex'

export default createStore({
  state: {
    restaurants: null
  },
  mutations: {
    setRestaurants(state, restaurants) {
      state.restaurants = restaurants
    }
  },
  actions: {
    initRestaurants({ commit }) {
      fetch('http://localhost:3000/restaurants')
        .then(res => res.json())
        .then(data => {
          commit('setRestaurants', data);
        }).catch(err => console.error(err))
    }
  },
  modules: {
  }
})
