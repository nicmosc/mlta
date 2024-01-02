import { Todo as TodoType } from '../../schema';
import { Todo } from './Todo';

interface TodoListProps {
  todos: TodoType[];
  onChange: VoidFunction;
}

export const TodoList = ({ todos, onChange }: TodoListProps) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onChange={onChange} />
      ))}
    </ul>
  );
};
