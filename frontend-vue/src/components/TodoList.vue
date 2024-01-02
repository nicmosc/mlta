<script setup lang="ts">
import type { Todo as TodoType } from '../schema';
import Todo from './Todo.vue';

interface Props {
  todos: TodoType[];
}

defineProps<Props>();
</script>

<template>
  <ul class="todo-list">
    <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>
