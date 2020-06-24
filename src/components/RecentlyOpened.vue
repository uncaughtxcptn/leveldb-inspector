<template>
  <div class="recently-opened">
    <span>Recently Opened:</span>
    <div class="recent-items">
      <a v-for="path in paths" :title="path.path" :key="path.path" @click="$emit('selected', path.path)">
        {{ path.display }}
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['populateRecentlyOpened'])
  },

  created() {
    this.populateRecentlyOpened();
  },

  computed: {
    ...mapState(['recentlyOpenedPaths']),

    paths() {
      const pathsToDisplay = this.recentlyOpenedPaths.slice(0, 2); // show only 2 paths
      return pathsToDisplay.map(path => {
        const parts = path.split('/');
        return {
          path,
          display: parts[parts.length - 1]
        };
      });
    }
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
