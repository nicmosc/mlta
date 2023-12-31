import cx from 'classnames';

import { Todo as TodoType } from '../../schema';

interface TodoProps {
  todo: TodoType;
}

export const Todo = ({ todo }: TodoProps) => {
  const editing = false;
  return (
    <li className={cx(todo.completed && 'completed', editing && 'editing')}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{todo.title}</label>
        <button className="destroy"></button>
      </div>
      <input className="edit" value={todo.title} onChange={() => {}} />
    </li>
  );
};
