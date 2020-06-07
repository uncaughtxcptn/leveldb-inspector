<template>
  <button v-bind="$attrs" v-on="$listeners">
    Disconnect
  </button>
</template>

<style scoped>
button {
  height: 2.67em;
  padding: 0 1em;
  border: none;

  font-size: 0.75em;
  line-height: 1.5;
  color: #d32f2f;
  background: none;
  cursor: pointer;
  position: relative;
  z-index: 2;
}
</style>
