import Vue from "vue";
import Vuex from "vuex";
import { appAxios } from "@/utils/appAxios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    rooms: [],
    usersInRoom: [],
  },
  getters: {
    _getCurrentUser: (state) => state.user,
    _getRooms: (state) => state.rooms,
    _getUsersInRoom: (state) => state.usersInRoom,
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
    setCurrentUser(state, payload) {
      state.user = payload;
    },
    setUsersInRoom(state, payload) {
      state.usersInRoom = payload;
    },
  },
  actions: {
    getRooms({ commit }) {
      appAxios
        .get("/rooms")
        .then((res) => {
          commit("setRooms", res.data);
        })
        .catch((err) => console.log(err));
    },
  },
});
