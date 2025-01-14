<template>
  <div class="growing-leaf">
    <div class="leaf"></div>
  </div>
</template>

<style scoped>
.growing-leaf {
  width: 60px;
  height: 60px;
  position: relative;
}

.leaf {
  width: 20px;
  height: 20px;
  background-color: #056f75;
  border-radius: 0 50% 50% 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  animation: grow 1.5s ease-in-out infinite;
}

@keyframes grow {
  0% {
    transform: rotate(45deg) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(45deg) scale(1.5);
    opacity: 0;
  }
}
</style>
