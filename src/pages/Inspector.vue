<template>
  <div>
    <DataTable :items="data" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import DataTable from '@components/DataTable.vue';

export default {
  components: {
    DataTable
  },

  computed: {
    ...mapState(['data']),
    ...mapGetters(['isConnected'])
  },

  methods: mapActions(['getDatabaseContents']),

  async created() {
    await this.getDatabaseContents();
  }
};
</script>
