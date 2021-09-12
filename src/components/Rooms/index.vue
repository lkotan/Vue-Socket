<template>
  <div class="sidebar">
    <div class="online-user">Online Users ({{ usersCount }})</div>
    <!-- <div>Users count in room => {{ usersInRoom }}</div> -->
    <div class="room-list" v-for="item in rooms" :key="item.id">
      <!-- <button @click="joinRoom(item)">
        {{ item.name }} ({{
          usersInRoom.filter((x) => x.room == item.name).length
        }})
      </button> -->
      <button @click="joinRoom(item)">
        {{ item.name }}
      </button>
    </div>
    <div class="logout">
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Rooms",
  props: {
    usersCount: {
      type: Number,
      required: false,
    },
  },
  created() {
    this.$store.dispatch("getRooms");
  },
  computed: {
    ...mapGetters({
      rooms: "_getRooms",
      currentUser: "_getCurrentUser",
      usersInRoom: "_getUsersInRoom",
    }),
  },
  methods: {
    async logout() {
      this.currentUser.active=false;
      await this.$appAxios.put(`/users/${this.currentUser.id}`,this.currentUser);
      this.$socket.emit("leaveChat");
      this.$store.commit("setCurrentUser", null);
      this.$router.push({ name: "Login" });
    },
    updateUsersInRoom() {
      this.$socket.on("updateUsersInRoom", (users) => {
        this.$store.commit("setUsersInRoom", users);
      });
    },
    joinRoom(item) {
      this.$socket.emit("joinRoom", {
        room: item.name,
        user: this.currentUser,
      });
      this.updateUsersInRoom();
      this.$router.push(`detail/${item.id}`);
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex-basis: 20%;
  background: purple;
  color: white;
}
.sidebar .online-user {
  text-align: center;
  margin-top: 10px;
  font-size: 20px;
}
.room-list {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
button {
  width: 215px;
  position: relative;
  transition: all 0.3s;
  padding: 10px 30px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  background: darkmagenta;
  color: white;
}
button:hover {
  background: white;
  color: purple;
}
button:after {
  content: "\➜";
  margin-left: 10px;
  position: absolute;
  top: 6px;
  font-size: large;
}
.logout {
  display: flex;
  justify-content: center;
}
.logout button{
  position: absolute;
  bottom: 0;
}
.logout button:after{
  content: "";
}
span {
  color: #a2a2a2;
  font-size: 14px;
}
</style>
