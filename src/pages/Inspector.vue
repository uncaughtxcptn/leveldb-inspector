<template>
  <div>
    <DataTable :items="data" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DataTable from '@components/DataTable.vue';

export default {
  components: {
    DataTable
  },

  computed: mapState(['data']),

  methods: mapActions(['getDatabaseContents']),

  async created() {
    await this.getDatabaseContents();
  }
};
</script>
