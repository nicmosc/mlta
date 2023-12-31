import { Fragment } from 'react';
import { Todo as TodoType } from '../../schema';
import { Todo } from './Todo';

interface TodoListProps {
  todos: TodoType[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
