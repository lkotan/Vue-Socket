<template>
  <div class="alert" :class="[message != null ? 'transition-active' : '']">
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    message: null,
  },
};
</script>

<style scoped>
.alert {
  width: 400px;
  position: absolute;
  top: 0;
  transform: translateY(-28px);
  transition: all 1s;
  opacity: .8;
  padding: 8px;
  border: none;
  border-bottom: solid 1px #e8f0fe;
  background: #0e0428;;
  color: white;
  font-size: 18px;
  letter-spacing: 1.1px;
}
.transition-active {
  transform: translateY(0);
}
p{
    text-align: center;
}
</style>
