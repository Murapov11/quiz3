<template>
  <div class="todo-list">
    <h1>To-Do List</h1>

    <!-- Input for new to-do with Add button -->
    <div class="add-todo">
      <input v-model="newTodo" placeholder="Add a new to-do..." />
      <button @click="addTodo">Add</button>
    </div>

    <!-- Filter and Sort dropdown with margin for separation -->
    <div class="controls">
      <div class="filters">
        <button @click="toggleFilter('all')">All</button>
        <button @click="toggleFilter('completed')">Completed</button>
        <button @click="toggleFilter('incomplete')">Incomplete</button>
      </div>
      <div class="sort">
        <label for="sortSelect">Sort by:</label>
        <select id="sortSelect" v-model="sortOrder" @change="toggleSort">
          <option value="asc">Incomplete First</option>
          <option value="desc">Completed First</option>
        </select>
      </div>
    </div>

    <!-- Animated to-do list -->
    <transition-group name="fade" tag="ul">
      <ToDoItem
        v-for="todo in sortedTodos"
        :key="todo.id"
        :todo="todo"
        @delete="deleteTodo"
        @toggle="toggleCompletion(todo)"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue';
import ToDoItem from '/src/components/ToDoItem.vue';
import useTodoMixin from '../mixins/TodoMixin';

export default defineComponent({
  components: { ToDoItem },
  setup() {
    const { todos, filteredTodos, toggleFilter } = useTodoMixin();
    const newTodo = ref('');
    const sortOrder = ref('asc'); // Default sorting order: 'asc' (Incomplete First)

    const addTodo = async () => {
      if (newTodo.value.trim()) {
        todos.value.push({ id: Date.now(), text: newTodo.value, completed: false });
        newTodo.value = '';
        await nextTick();
      }
    };

    const deleteTodo = (id: number) => {
      todos.value = todos.value.filter(todo => todo.id !== id);
    };

    const toggleCompletion = (todo: { completed: boolean }) => {
      todo.completed = !todo.completed;
    };

    const toggleSort = () => {
      // Optional: You can add any logic here if needed when the dropdown changes.
    };

    const sortedTodos = computed(() => {
      const sorted = [...filteredTodos.value];
      return sorted.sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.completed - b.completed; // Incomplete First
        }
        return b.completed - a.completed; // Completed First
      });
    });

    return {
      newTodo,
      filteredTodos,
      sortedTodos,
      addTodo,
      deleteTodo,
      toggleCompletion,
      toggleFilter,
      toggleSort,
      sortOrder,
    };
  },
});
</script>

<style scoped>
.add-todo{
  margin-bottom: 10px;
}
.add-todo input {
  margin-right: 10px;
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.add-todo input:focus {
  border-color: #42b883;
}

.add-todo button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #42b883;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-todo button:hover {
  background-color: #369a6f;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.filters,
.sort {
  display: flex;
  gap: 10px;
  align-items: center; /* Vertically align the text and select */
}

.filters button,
.sort select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filters button:hover,
.sort select:hover {
  background-color: #f0f0f0;
}

.sort {
  margin-left: 20px; /* Adding margin to separate the sort section */
}

label {
  margin-right: 10px;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
