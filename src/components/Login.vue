<template>
  <div class="login">
    <Alert :message="alertMessage" />
    <div class="form">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" v-model="loginModel.email" name="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" v-model="loginModel.password" name="password" />
      </div>
      <button @click="login" class="login-button">
       Login
      </button>
      <div class="form-bottom">
        <h3>Not a member?</h3>
        <button @click="$router.push({ name: 'Register' })">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Alert from "@/components/Alert.vue";

export default {
  name: "Login",
  components: {
    Alert,
  },
  data() {
    return {
      loginModel: {
        email: null,
        password: null,
      },
      alertMessage: null,
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "_getCurrentUser",
    }),
  },
  methods: {
    async login() {
      const users = await this.$appAxios.get("/users");
      const user = users.data.filter(
        (x) =>
          x.email == this.loginModel.email &&
          x.password == this.loginModel.password
      )[0];
      if (user != undefined) {
        if (user.active){
          this.showMessage("You are logged in !");
          return;
        }
        user.active = true;
        await this.$appAxios.put(`/users/${user.id}`, user);
        this.$store.commit("setCurrentUser", user);
        this.$router.push({ name: "Dashboard" });
        this.$socket.emit("joinChat", user);
      } else this.showMessage("Please check your login information !");
    },
    showMessage(text) {
      this.alertMessage = text;
      setTimeout(() => {
        this.alertMessage = null;
      }, 2500);
    },
  },
};
</script>

<style scoped>
.login-button {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  background: #431a40;
}
</style>
