<template>
  <div class="sprout-container">
    <div class="soil"></div>
    <div class="stem"></div>
    <div class="leaves">
      <div class="leaf left"></div>
      <div class="leaf right"></div>
    </div>
  </div>
</template>

<style scoped>
.sprout-container {
  width: 100px;
  height: 100px;
  position: relative;
}

.soil {
  width: 60px;
  height: 20px;
  background: #8b4513;
  border-radius: 0 0 30px 30px;
  position: absolute;
  bottom: 0;
  left: 20px;
}

.stem {
  width: 4px;
  height: 0;
  background: #056f75;
  position: absolute;
  bottom: 20px;
  left: 48px;
  animation: grow-stem 2s ease-out infinite;
}

.leaves {
  position: absolute;
  bottom: 40px;
  left: 50px;
  opacity: 0;
  animation: show-leaves 2s ease-out infinite;
}

.leaf {
  width: 20px;
  height: 20px;
  background: #056f75;
  position: absolute;
  border-radius: 20px 0;
}

.leaf.left {
  transform: rotate(-45deg);
  left: -20px;
}

.leaf.right {
  transform: rotate(45deg);
  right: -20px;
}

@keyframes grow-stem {
  0% {
    height: 0;
  }
  50% {
    height: 40px;
  }
  100% {
    height: 40px;
  }
}

@keyframes show-leaves {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0;
    transform: scale(0);
  }
  75% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
