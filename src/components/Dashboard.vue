<template>
  <div class="room">
    <Rooms :usersCount="usersCount" />
    <div class="content">
      <img src="@/assets/img/chat-dashboard.jpg" alt="" />
      <p>
        Welcome to Chat. You can join the room you want and start a private
        chat...
      </p>
    </div>
  </div>
</template>

<script>
import Rooms from "@/components/Rooms";

export default {
  name: "Dashboard",
  components: {
    Rooms,
  },
  data() {
    return {
      usersCount: 0,
    };
  },
  created() {
    this.$socket.on("updateUsers", (users) => {
      this.usersCount = users.length;
    });
  },
};
</script>

<style scoped>
.room {
  height: 100vh;
  display: flex;
}
.content {
  flex-basis: 80%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content img {
  width: 300px;
  height: 400px;
  filter: hue-rotate(269deg) opacity(0.5);
}
.content p {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1.1px;
  color: purple;
}
</style>
