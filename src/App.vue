<script setup lang="ts">
import ToDoList from './components/ToDoList.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>To-Do List</h1>
    </header>

    <!-- To-Do List Component -->
    <main>
      <ToDoList />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
}

header h1 {
  color: #333;
  font-size: 2.5em;
  margin-bottom: 1rem;
}

main {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>