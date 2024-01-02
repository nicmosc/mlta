<script setup lang="ts">
import NewTodo from './components/NewTodo.vue';
import TodoList from './components/TodoList.vue';
import Filters from './components/Filters.vue';

import { ref } from 'vue';
import type { Todo } from './schema';

const count = ref(0);

function increment() {
  count.value++;
}

const todos: Todo[] = [
  { id: '1', title: 'My journey with Vue', completed: false },
  { id: '2', title: 'Blogging with Vue', completed: false },
  { id: '3', title: 'Why Vue is so fun', completed: false },
];
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <NewTodo />
    </header>
    <section class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all">Mark all as complete</label>
      <TodoList :todos="todos" />
    </section>
    <footer class="footer">
      <span class="todo-count"
        ><strong>{{ count }}</strong> item left</span
      >
      <Filters />
      <button @click="increment" class="clear-completed">Clear completed</button>
    </footer>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
  </footer>
</template>
