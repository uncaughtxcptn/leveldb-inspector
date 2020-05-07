<template>
  <tr class="data-table-row" :class="{ editing: isEditing }">
    <td class="key-column">
      <div>
        {{ data.key }}
        <button @click="$emit('delete')">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.00001 1.33333C11.6867 1.33333 14.6667 4.31333 14.6667 8C14.6667 11.6867 11.6867 14.6667 8.00001 14.6667C4.31334 14.6667 1.33334 11.6867 1.33334 8C1.33334 4.31333 4.31334 1.33333 8.00001 1.33333ZM10.3933 4.66666L8.00001 7.06L5.60668 4.66666L4.66668 5.60666L7.06001 8L4.66668 10.3933L5.60668 11.3333L8.00001 8.93999L10.3933 11.3333L11.3333 10.3933L8.94001 8L11.3333 5.60666L10.3933 4.66666Z"
            />
          </svg>
        </button>
      </div>
    </td>
    <td @dblclick="startEditing">
      <input
        v-if="isEditing"
        ref="input"
        type="text"
        v-model="value"
        @keydown.enter="stopEditing"
        @blur="stopEditing"
      />
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
tr.editing {
  background-color: #5482ff;
}

td:first-child {
  width: 21.67em;
  border-right: 1px solid #bbbbbb;
}

td {
  height: 2.67em;
  padding: 0 2em;
  padding-right: 1em;

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
  color: #fff;
  background-color: transparent;
}

.key-column > div {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0;
  border: 0;
  margin-left: 1em;

  background: none;
  cursor: pointer;
  opacity: 0;
}

tr.editing button,
tr:hover button {
  opacity: 1;
}

button svg {
  display: block;
}

button svg path {
  fill: #bbb;
}

.editing button svg path {
  fill: #fff;
}
</style>
