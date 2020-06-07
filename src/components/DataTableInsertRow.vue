<template>
  <tr class="data-table-insert-row" :class="{ creating: isCreating }">
    <td class="key-column" @click="startCreating('keyInput')">
      <input
        v-if="isCreating"
        ref="keyInput"
        type="text"
        placeholder="Enter key"
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
        placeholder="Enter value"
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

  font-size: 0.75em;
  text-align: left;

  max-width: 0; /* required for ellipsis overflow to work */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  position: sticky;
  bottom: 0;
  background-color: #f2f2f2;
  /* Here we're using an inset shadow instead of a top border to achieve the
     same effect. This is to prevent the border from disappearing when the
     table cells become sticky. */
  box-shadow: inset 0 1px 0 0 #bbbbbb;
}

tr:not(.creating) td {
  padding: 0 2em;
}

input {
  width: 100%;
  height: 2.67em;
  padding: 0 2em;
  border: 0;
  margin: 0;
  background-color: #fff;
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
