<template>
  <tr class="data-table-row">
    <td>{{ data.key }}</td>
    <td>{{ data.value }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
td:first-child {
  width: 21.67em;
  border-right: 1px solid #bbbbbb;
}

td {
  height: 2.67em;
  padding: 0 2em;

  font-size: 0.75em;
  text-align: left;

  max-width: 0; /* required for ellipsis overflow to work */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
