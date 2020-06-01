<template>
  <table>
    <thead>
      <tr>
        <th>Key</th>
        <th>Value</th>
      </tr>
    </thead>

    <tbody>
      <DataTableRow
        v-for="item in items"
        :key="item.key"
        :data="item"
        @change="setValue({ key: item.key, value: $event })"
        @delete="deleteKey(item.key)"
      />

      <tr class="spacer">
        <td></td>
        <td></td>
      </tr>

      <DataTableInsertRow @create="setValue" />
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex';
import DataTableRow from '@components/DataTableRow.vue';
import DataTableInsertRow from '@components/DataTableInsertRow.vue';

export default {
  components: {
    DataTableRow,
    DataTableInsertRow
  },

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  methods: mapActions(['setValue', 'deleteKey'])
};
</script>

<style scoped>
table {
  width: 100%;
  min-height: 100vh;
  border-collapse: collapse;
  position: relative;
}

.data-table-row:not(.editing):nth-child(2n) {
  background-color: #f0f4ff;
}

th {
  height: 2.67em;
  padding: 0 2em;

  font-size: 0.75em;
  font-weight: 400;
  text-align: left;

  position: sticky;
  top: 0;
  background-color: #f2f2f2;
  /* Here we're using an inset shadow instead of a bottom border to achieve the
     same effect. This is to prevent the border from disappearing when the
     table cells become sticky. */
  box-shadow: inset 0 -1px 0 0 #bbbbbb;
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
