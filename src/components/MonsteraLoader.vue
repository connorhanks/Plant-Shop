<template>
  <div class="monstera-container">
    <div class="leaf" v-for="n in 3" :key="n"></div>
  </div>
</template>

<style scoped>
.monstera-container {
  width: 100px;
  height: 100px;
  position: relative;
}

.leaf {
  width: 30px;
  height: 30px;
  background: #056f75;
  position: absolute;
  border-radius: 0 15px 0 15px;
  transform-origin: bottom right;
}

.leaf:nth-child(1) {
  animation: dance 1s ease-in-out infinite;
}

.leaf:nth-child(2) {
  animation: dance 1s ease-in-out infinite 0.2s;
  left: 20px;
}

.leaf:nth-child(3) {
  animation: dance 1s ease-in-out infinite 0.4s;
  left: 40px;
}

@keyframes dance {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-20deg);
  }
}
</style>
