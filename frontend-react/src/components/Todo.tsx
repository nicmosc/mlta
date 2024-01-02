import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import urlJoin from 'url-join';

import { Todo as TodoType, UpdateTodoRequest, UpdateTodoResponse } from '../../schema';
import { useClickOutside, useDebounce, useDoubleClick, useMutateData } from '../hooks';

interface TodoProps {
  todo: TodoType;
  onChange: VoidFunction;
}

export const Todo = ({ todo, onChange }: TodoProps) => {
  const [todoTitle, updateTodoTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const debouncedTitle = useDebounce<string>(todo.title, 500);
  const ref = useRef<HTMLLIElement>(null);

  const { mutate: update } = useMutateData<UpdateTodoRequest, UpdateTodoResponse>(
    urlJoin(import.meta.env.VITE_API_URL, `/api/todos/${todo.id}`),
  );

  useDoubleClick(ref, () => {
    setIsEditing(true);
  });

  useClickOutside(ref, () => {
    setIsEditing(false);
  });

  const handleUpdateTodo = async (todoDto: Partial<UpdateTodoRequest>) => {
    const { data } = await update({
      method: 'put',
      body: {
        id: todo.id,
        completed: todoDto.completed,
        title: todoDto.title,
      },
    });
    if (data != null) {
      onChange();
    }
  };

  const handleDeleteTodo = async () => {
    const { data } = await update({
      method: 'delete',
    });

    if (data?.id === todo.id) {
      onChange();
    }
  };

  useEffect(() => {
    if (debouncedTitle !== todoTitle) {
      handleUpdateTodo({ title: debouncedTitle });
    }
  }, [debouncedTitle]);

  return (
    <li ref={ref} className={cx(todo.completed && 'completed', isEditing && 'editing')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleUpdateTodo({ completed: !todo.completed })}
        />
        <label>{todoTitle}</label>
        <button className="destroy" onClick={handleDeleteTodo} />
      </div>
      <input className="edit" value={todoTitle} onChange={(e) => updateTodoTitle(e.target.value)} />
    </li>
  );
};
