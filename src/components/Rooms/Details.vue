<template>
  <div class="room-details">
    <div class="sidebar">
      <div>
        <p v-if="usersInRoom.length != 0">
          Welcome to {{ usersInRoom[0].room }} room :
          <span>({{ usersInRoom.length }})</span>
        </p>
        <ul v-for="(user, index) in usersInRoom" :key="index">
          <li>
            {{ user.name }}
            <span v-if="currentUser.name == user.name"> (You) </span>
          </li>
        </ul>
      </div>
      <button @click="leaveRoom">Leave Room</button>
    </div>
    <div class="chat">
      <div class="messages">
        <div class="admin-message">
          <div v-for="message in messageList" :key="message">
            <span>Admin : </span> {{ message }}
            <button @click="removeMessage(message)">X</button>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in userMessages"
            :key="index"
            :class="[currentUser.name == item.name ? 'blackShow' : '']"
          >
            <p>
              <span>{{ item.name }} </span> {{ item.time }}
            </p>
            <span>{{ item.message }}</span>
          </li>
        </ul>
      </div>
      <div class="send-message">
        <input
          type="text"
          v-model="message"
          placeholder="message"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">Send Message</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Details",
  data() {
    return {
      message: null,
      userMessages: [],
      messageList: [],
      user: {},
    };
  },
  mounted() {
    this.$socket.on("userMessages", ({ name, message, time }) => this.userMessages.push({ name, message, time }));
    this.$socket.on("userInRoomMessage", (message) =>  this.messageList.push(message));
    this.$socket.on("userLeftRoomMessage", (message) => this.messageList.push(message));
    this.$socket.on("userLeftChatMessage", (message) => this.messageList.push(message));
  },
  computed: {
    ...mapGetters({
      currentUser: "_getCurrentUser",
      usersInRoom: "_getUsersInRoom",
    }),
  },
  methods: {
    removeMessage(message) {
      const index = this.messageList.indexOf(message);
      if (index > -1) this.messageList.splice(index, 1);
    },
    sendMessage() {
      this.$socket.emit("createMessage", this.message);
      this.message = null;
    },
    leaveRoom() {
      this.$socket.emit("leaveRoom", this.currentUser);
      this.$router.push({ name: "Dashboard" });
    },
  },
};
</script>

<style scoped>
.room-details {
  display: flex;
  overflow: hidden;
  height: 100vh;
}
.sidebar {
  flex-basis: 25%;
  background: #44a1af;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sidebar p {
  margin: 10px;
  padding-bottom: 4px;
  font-size: 20px;
  border: none;
  border-bottom: solid 1px #efefef;
  color: white;
}
button {
  padding: 10px;
  border: none;
  cursor: pointer;
  background: #0e0428;
  color: white;
}
ul {
  list-style: none;
  margin: 10px;
}
.sidebar li {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 24px;
  letter-spacing: 1.2px;
  position: relative;
  color: #5c1f26;
  overflow-y: auto;
}
.sidebar li span {
  color: white;
  margin-left: 10px;
}
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 85%;
  background: #d6d3d4;
}
.messages {
  max-height: 588px;
  overflow-y: auto;
}

.messages li:not(:first-child) {
  margin-top: 20px;
}
.messages li {
  padding: 10px;
  box-shadow: 2px 2px 2px 1px rgb(0 0 0 / 20%);
  background: #d8d8d8;
}
.messages li p {
  margin-bottom: 4px;
}
.messages li span:first-child {
  text-transform: lowercase;
  color: #44a1af;
}
.messages li span:last-child {
  font-size: 20px;
}
.admin-message {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
}
.admin-message button {
  font-size: 16px;
  background: transparent;
  border: 0;
  cursor: pointer;
}
.admin-message div:first-child {
  margin-top: 0;
}
.admin-message div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 4px;
  border-radius: 4px 0 0 4px;
  background: #0e0428;
}
.blackShow {
  box-shadow: 2px 2px 2px 1px rgb(0 0 0) !important;
}
.send-message {
  display: flex;
}
.send-message input {
  width: 90%;
  padding-top: 12.5px;
  border-radius: 0;
}
.send-message button {
  padding: 8px;
}
</style>
