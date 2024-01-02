<script setup lang="ts">
import type { Todo } from '../schema';

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();
</script>

<template>
  <li>
    <div class="view">
      <input class="toggle" type="checkbox" />
      <label>{{ props.todo.title }}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web" />
  </li>
</template>
