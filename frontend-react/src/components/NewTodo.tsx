import { useCallback, useEffect, useState } from 'react';
import urlJoin from 'url-join';

import { AddTodoRequest, AddTodoResponse } from '../../schema';
import { useMutateData } from '../hooks';

interface NewTodoProps {
  onCreate: VoidFunction;
}

export const NewTodo = ({ onCreate }: NewTodoProps) => {
  const [title, setTitle] = useState('');

  const { mutate: create } = useMutateData<AddTodoRequest, AddTodoResponse>(
    urlJoin(import.meta.env.VITE_API_URL, `/api/todos`),
  );

  const handleAddTodo = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && title != '') {
      const { data } = await create({
        method: 'post',
        body: {
          todo: {
            title,
          },
        },
      });

      if (data?.data != null) {
        onCreate();
        setTitle('');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', handleAddTodo);

    return () => {
      document.removeEventListener('keypress', handleAddTodo);
    };
  }, [title]);

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};
