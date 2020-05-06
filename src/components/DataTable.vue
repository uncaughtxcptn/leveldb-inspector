<template>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>

    <tbody>
      <DataTableRow v-for="item in items" :key="item.key" :data="item" @change="handleChange(item.key, $event)" />

      <tr class="spacer">
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex';
import DataTableRow from '@components/DataTableRow.vue';

export default {
  components: {
    DataTableRow
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    ...mapActions(['setValue']),

    async handleChange(key, value) {
      await this.setValue({ key, value });
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  min-height: 100vh;
  border-collapse: collapse;
}

thead tr {
  border-bottom: 1px solid #bbbbbb;
  background-color: #f2f2f2;
}

.data-table-row:nth-child(2n) {
  background-color: #f0f4ff;
}

th {
  font-weight: 400;
}

th {
  height: 2.67em;
  padding: 0 2em;

  font-size: 0.75em;
  text-align: left;

  max-width: 0; /* required for ellipsis overflow to work */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

th:first-child,
td:first-child {
  width: 21.67em;
  border-right: 1px solid #bbbbbb;
}

tr.spacer td {
  height: auto;
  background-color: #ffffff;
}
</style>
