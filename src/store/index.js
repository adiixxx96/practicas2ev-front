import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games:[],
    usergames:[],
    formGame:{
      id:'',
      name:'',
      description:'',
      price:'',
      quantity:''
    },
    user:null,
    auth:0
  },
  getters: {
  },
  mutations: {
    setGames(state, payload){
      state.games=payload
    },
    setUser(state, payload) {
      if (payload!=null) {
     router.push("/")
      }
      state.user = payload
      localStorage.setItem('user', JSON.stringify(payload));
      state.auth = (payload && payload.role) ? 1 : 0;
    },
    setUserGames(state, payload) {
      state.usergames = payload;
    },
    addGame(state, newGame) {
      state.games.push(newGame);
    },
    setGameData(state, data) {
      state.formGame.id=data.id
      state.formGame.name = data.name;
      state.formGame.price = data.price;
      state.formGame.description = data.description;
      state.formGame.quantity = data.quantity;
    },
  },
  actions: {
    fetchGames({commit}){
      fetch("https://localhost:7100/Game")
        .then(response => response.json())
        .then(response => commit('setGames', response));
    },
    fetchUser({commit}, { username, password }){
        fetch(`https://localhost:7100/Users/${username}/${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })
      .then(response => {
        if (!response.ok) {
          window.alert("User not found")
        }
        return response.json();
      })
      .then(response => {commit('setUser',response);
    })
    .catch (error => {
      console.error(error);
    })

  
    },
    logout({ commit }) {
      commit('setUser', null )
      commit('setUserGames', [])
    },
    fetchUserGames({ commit, state }) {
      fetch(`https://localhost:7100/UserGame/User/${state.user.id}`)
        .then(response => response.json())
        .then(response => {
          commit('setUserGames', response);
        });
    },
    addGame({ commit }, gameData) {
      fetch("https://localhost:7100/Game", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      })
      .then(response => response.json())
      .then(response => {commit('addGame', response)});
    },
    addUser({ commit }, userData) {
      fetch("https://localhost:7100/Users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      commit('addUser');
    },
    async fetchGameById({ commit }, gameId) {
      try {
        const response = await fetch(`https://localhost:7100/Game/${gameId}`);
        const data = await response.json();
        commit('setGameData', data);
      } catch (error) {
        console.log(error);
      }
    },
    deleteGame({ commit }, game) {
      fetch(`https://localhost:7100/Game/${game.id}`, {
        method: `DELETE`,
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchGames');
        })
    },
    deleteUser({ commit, state }) {
      fetch(`https://localhost:7100/Users/${state.user.id}`, {
      method: `DELETE`,
      headers: {
      "Content-type": "application/json"
      }
      })
        .then(() => {
          commit('setUser', null)
        })
    },
    actualizeGame({ commit }, gameData) {
      fetch(`https://localhost:7100/Game`, {
          method: `PUT`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(gameData),
        })
        .then(() => {
          console.log(commit)
          this.dispatch('fetchGames');
        })
    },
    actualizeUser({ commit }, userData) {
      fetch(`https://localhost:7100/Users`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      commit('setUser', null)
    }, 
  },
  modules: {
  }
})
