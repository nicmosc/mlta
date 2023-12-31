import { StrictMode } from 'react';
import urlJoin from 'url-join';
import cx from 'classnames';

import { useFetchData } from './hooks';
import { TodosResponse } from '../schema';

export const App = () => {
  const { data, isLoading } = useFetchData<TodosResponse>(
    urlJoin(import.meta.env.VITE_API_URL, '/api/todos'),
  );
  const editing = false;

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
          <ul className="todo-list">
            {data?.data?.map((todo) => (
              <li key={todo.id} className={cx(todo.completed && 'completed', editing && 'editing')}>
                <div className="view">
                  <input className="toggle" type="checkbox" />
                  <label>{todo.title}</label>
                  <button className="destroy"></button>
                </div>
                <input className="edit" value={todo.title} onChange={() => {}} />
              </li>
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item left
          </span>
          <ul className="filters">
            <li>
              <a className="selected" href="#/">
                All
              </a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
      </footer>
    </StrictMode>
  );
};
