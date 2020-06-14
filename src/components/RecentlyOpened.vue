<template>
  <div class="recently-opened">
    <span>Recently Opened:</span>
    <div class="recent-items">
      <a v-for="path in paths" v-bind:title="path.path" :key="path.path" @click="$emit('selected', path.path)">
        {{ path.display }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      paths: []
    };
  },
  created() {
    this.getRecentlyOpened().then(paths => {
      paths = paths.splice(0, 2); // show only 2 paths
      this.paths = paths.map(path => {
        const parts = path.split('/');
        return {
          path,
          display: parts[parts.length - 1]
        };
      });
    });
  },

  methods: {
    ...mapActions(['getRecentlyOpened'])
  }
};
</script>

<style scoped>
.recently-opened {
  margin-top: 20px;
}

.recent-items {
  margin-top: 15px;
}

.recently-opened a {
  cursor: pointer;
  background-color: #ddd;
  margin-right: 10px;
  padding: 7px;
  padding-bottom: 5px;
  border-radius: 3px;
  font-size: 0.75em;
}
</style>
