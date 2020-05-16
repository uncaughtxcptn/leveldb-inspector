<template>
  <tr class="data-table-insert-row">
    <td class="key-column" @click="startCreating('keyInput')">
      <input
        v-if="isCreating"
        ref="keyInput"
        type="text"
        v-model="key"
        @keydown.enter="stopCreating"
        @keydown.esc="stopCreating(false)"
        @blur="handleBlur"
      />
      <template v-else>Add key-value pair</template>
    </td>
    <td @click="startCreating('valueInput')">
      <input
        v-if="isCreating"
        ref="valueInput"
        type="text"
        v-model="value"
        @keydown.enter="stopCreating"
        @keydown.esc="stopCreating(false)"
        @blur="handleBlur"
      />
    </td>
  </tr>
</template>

<script>
export default {
  data() {
    return {
      isCreating: false,
      key: '',
      value: ''
    };
  },

  methods: {
    startCreating(inputKey) {
      if (inputKey === 'valueInput' && !this.isCreating) {
        return;
      }

      this.isCreating = true;
      this.$nextTick(() => {
        this.$refs[inputKey].focus();
      });
    },

    stopCreating(save = true) {
      const { key, value } = this;
      this.key = '';
      this.value = '';
      this.isCreating = false;

      if (save) {
        this.$emit('create', { key, value });
      }
    },

    handleBlur() {
      if (!this.key && !this.value) {
        this.stopCreating(false);
      }
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
  border-top: 1px solid #bbb;

  font-size: 0.75em;
  text-align: left;
  background-color: #f2f2f2;

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

.key-column {
  cursor: pointer;
}

.key-column > div {
  display: flex;
  justify-content: space-between;
}

button svg {
  display: block;
}

button svg path {
  fill: #bbb;
}
</style>
