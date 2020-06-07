<template>
  <div>
    <header>
      <DisconnectButton @click="disconnect" />
    </header>
    <DataTable :items="data" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DataTable from '@components/DataTable.vue';
import DisconnectButton from '@components/DisconnectButton.vue';

export default {
  components: {
    DataTable,
    DisconnectButton
  },

  computed: mapState(['data']),

  methods: {
    ...mapActions(['getDatabaseContents', 'disconnectFromDatabase']),

    async disconnect() {
      const { error } = await this.disconnectFromDatabase();
      if (error) {
        alert(error);
      } else {
        this.$router.replace('/');
      }
    }
  },

  async created() {
    await this.getDatabaseContents();
  }
};
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 2em;
  text-align: right;
}
</style>
