<template>
  <div>
    <DataTable />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DataTable from '@components/DataTable.vue';

export default {
  components: {
    DataTable
  },

  computed: {
    ...mapGetters(['isConnected'])
  }
};
</script>
