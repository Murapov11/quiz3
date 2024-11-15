import { ref, computed, watch } from 'vue';

export default function useTodoMixin() {
  const filter = ref('all');
  const todos = ref<{ id: number; text: string; completed: boolean }[]>([]);

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'completed':
        return todos.value.filter(todo => todo.completed);
      case 'incomplete':
        return todos.value.filter(todo => !todo.completed);
      default:
        return todos.value;
    }
  });

  const toggleFilter = (status: string) => {
    filter.value = status;
  };

  return {
    todos,
    filter,
    filteredTodos,
    toggleFilter,
  };
}