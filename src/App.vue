<template>
  <router-view> </router-view>
</template>


<script>
export default {
  name: "App",
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.login,
.register {
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
}
.login h4:first-child,
.register h4:first-child {
  font-size: 18px;
  margin-bottom: 10px;
  color: red;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  padding: 30px;
  border-radius: 4px;
  background: linear-gradient(
    124deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(68, 21, 58, 1) 54%,
    rgba(0, 212, 255, 1) 100%
  );
}
.form-control {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
label {
  margin-bottom: 2px;
  font-size: 18px;
  color: white;
}
input {
  border: 0;
  outline: 0;
  padding: 5px;
  border-radius: 6px;
  font-size: 16px;
  color: purple;
}
.form button {
  padding: 8px;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  color: white;
}
.form-bottom {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: white;
}
.form-bottom button {
  background: #0e0428;
}
span {
  font-size: 14px;
}
</style>
