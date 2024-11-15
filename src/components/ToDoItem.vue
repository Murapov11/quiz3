<template>
  <li :class="{ completed: todo.completed }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggle"
        class="todo-checkbox"
      />
      <span>{{ todo.text }}</span>
    </div>
    <button @click="deleteTodo">Delete</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<{ id: number; text: string; completed: boolean }>,
      required: true,
    },
  },
  emits: ['delete', 'toggle'],
  methods: {
    deleteTodo() {
      this.$emit('delete', this.todo.id);
    },
    toggle() {
      this.$emit('toggle', this.todo);
    },
  },
});
</script>

<style scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

li.completed span {
  text-decoration: line-through;
  color: gray;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.todo-checkbox {
  cursor: pointer;
}

button {
  background: none;
  border: none;
  color: red;
  cursor: pointer;
}
</style>