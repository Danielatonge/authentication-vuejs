import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = null;

      //location.reload()
    }
  },
  actions: {
    register({ commit }, userData) {
      return axios
        .post("//localhost:3000/register", userData)
        .then(({ data }) => {
          console.log("🚀 ~ file: index.js ~ line 21 ~ .then ~ data", data);
          commit("SET_USER_DATA", data);
        });
    },
    login({ commit }, credential) {
      return axios
        .post("//localhost:3000/login", credential)
        .then(({ data }) => {
          console.log("🚀 ~ file: index.js ~ line 21 ~ .then ~ data", data);
          commit("SET_USER_DATA", data);
        })
        .catch((err) => {
          throw err;
        });
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    }
  },
  modules: {}
});
