<template>
  <div class="flex items-center justify-center w-full h-full b g-auth-dark">
    <div
    :class="classes"
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      type: String,
      default: "",
    },
  },
};
</script>
<style>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
