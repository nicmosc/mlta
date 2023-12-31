import { StrictMode } from 'react';
import urlJoin from 'url-join';

import { useFetchData } from './hooks';
import { TodosResponse } from '../schema';
import { Filters, TodoList } from './components';

export const App = () => {
  const { data, isLoading, error } = useFetchData<TodosResponse>(
    urlJoin(import.meta.env.VITE_API_URL, '/api/todos'),
  );

  return (
    <StrictMode>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {!isLoading && !error && <TodoList todos={data.data!} />}
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{data?.data?.filter((todo) => !todo.completed).length ?? 0}</strong> items left
          </span>
          <Filters />
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </StrictMode>
  );
};
