<template>
  <div class="register">
    <Alert :message="alertMessage" />
    <div class="form">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" v-model="registerModel.email" name="email" />
      </div>
      <div class="form-control">
        <label for="name">Name</label>
        <input type="text" v-model="registerModel.name" name="name" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="registerModel.password"
          @keyup="passwordValidation($event)"
          name="password"
        />
        <span v-if="!passwordValid">Password is at least 4 characters !</span>
      </div>
     
      <button
        @click="register"
        class="register-button"
        :disabled="isDisabled"
        :class="[isDisabled ? 'disabled' : '']"
      >
        Register
      </button>
      <div class="form-bottom">
        <h3>Are you a member?</h3>
        <button @click="$router.push({ name: 'Login' })">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "Register",
  components: {
    Alert,
  },
  data() {
    return {
      registerModel: {
        email: null,
        name: null,
        password: null,
      },
      alertMessage: null,
      passwordValid:true
    };
  },
  computed: {
    isDisabled() {
      let disabled = false;
      const array = Object.values(this.registerModel);
      const passwordLenght = array[2]?.length;
      array.map((item) => {
        if (item == null || passwordLenght <= 3) disabled = true;
      });
      return disabled;
    },
  },
  methods: {
    passwordValidation(e){
     this.passwordValid = e.target.value.length <=3 ? false : true;
    },
    async register() {
      const users = await this.$appAxios.get("/users");
      const user = users.data.filter(
        (x) =>
          x.email == this.registerModel.email
      )[0];
      if (!user) {
        this.registerModel.active=true;
        const res=await this.$appAxios.post("/users", this.registerModel);
        this.$store.commit("setCurrentUser",res.data);
        this.$router.push("/dashboard");
        this.$socket.emit("joinChat", res.data);
      } else {
        this.alertMessage = `${this.registerModel.email} available in the system !`;
        setTimeout(() => {
          this.alertMessage = null;
        }, 2500);
      }
    },
  },
};
</script>

<style scoped>
.form-control span{
  color:red;
}
.register-button {
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  background: #431a40;
}
.disabled {
  cursor: default;
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
