import { StrictMode } from 'react';
import urlJoin from 'url-join';

import { TodosResponse, UpdateTodoRequest, UpdateTodoResponse } from '../schema';
import { Filters, NewTodo, TodoList } from './components';
import { useFetchData, useMutateData, useUrlParams } from './hooks';

export const App = () => {
  const { data, refetch } = useFetchData<TodosResponse>(
    urlJoin(import.meta.env.VITE_API_URL, '/api/todos'),
    { keepPreviousData: true },
  );

  const { mutate: update } = useMutateData<UpdateTodoRequest, UpdateTodoResponse>(
    urlJoin(import.meta.env.VITE_API_URL, `/api/todos`),
  );

  const {
    urlParamsObject: { filter },
    setUrlParams,
  } = useUrlParams<{ filter: 'active' | 'completed' }>();

  const allCompleted = data?.every((todo) => todo.completed);

  const handleToggleAll = async () => {
    const todos = data ?? [];
    for (const todo of todos) {
      await update({
        method: 'put',
        body: { id: todo.id, completed: !allCompleted },
        params: `/${todo.id}`,
      });
    }

    refetch();
  };

  const todos =
    data?.filter((todo) => {
      if (filter === 'active') {
        return !todo.completed;
      }
      if (filter === 'completed') {
        return todo.completed;
      }
      return true;
    }) ?? [];

  return (
    <StrictMode>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo onCreate={refetch} />
        </header>
        <section className="main">
          <input
            onChange={() => handleToggleAll()}
            checked={allCompleted ?? false}
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList todos={todos} onChange={refetch} />
        </section>
        {
          <footer className="footer">
            <span className="todo-count">
              <strong>{data?.filter((todo) => !todo.completed).length ?? 0}</strong> items left
            </span>
            <Filters value={filter} onChange={(v) => setUrlParams({ filter: v })} />
            {data?.some((todo) => todo.completed) && (
              <button className="clear-completed">Clear completed</button>
            )}
          </footer>
        }
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </StrictMode>
  );
};
