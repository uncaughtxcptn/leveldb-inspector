<template>
  <tr class="data-table-row">
    <td>{{ data.key }}</td>
    <td @dblclick="startEditing">
      <input v-if="isEditing" ref="input" type="text" v-model="value" @keydown.enter="stopEditing" />
      <template v-else>
        {{ value }}
      </template>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isEditing: false,
      value: this.data.value
    };
  },

  methods: {
    startEditing() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    stopEditing() {
      this.isEditing = false;
      this.$emit('change', this.value);
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

input {
  width: 100%;
  height: 1.75em;
  padding: 0;
  border: 0;
  margin: 0;
  background-color: transparent;
}
</style>
