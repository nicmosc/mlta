import supertest from 'supertest';
import {
  AddTodoRequest,
  AddTodoResponse,
  Todo,
  TodosResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from '../schema';
import { setupDB } from './test.setup';

import { TodoModel, todos } from './test.data';

const API_URL = process.env.API_URL;

const request = supertest(API_URL!);

// Connects / disconnects / drops collections after each
setupDB('test');

describe('Todos', () => {
  beforeEach(async () => {
    try {
      await TodoModel.insertMany(todos);
    } catch (e) {
      console.error(e);
    }
  });

  describe('/GET todos', () => {
    it('should return a list of todos', async () => {
      const res = await request.get('/api/todos').expect(200);
      expect(res.body).toMatchObject<TodosResponse>({
        data: expect.arrayContaining<Todo>([
          {
            id: expect.any(String),
            title: expect.any(String),
            completed: expect.any(Boolean),
          },
        ]),
      });
    });

    it('should return a list of filtered todos (completed or not)', async () => {
      const resCompleted = await request.get('/api/todos').query({ completed: true }).expect(200);
      expect(resCompleted.body).toMatchObject<TodosResponse>({
        data: expect.arrayContaining<Todo>([
          {
            id: expect.any(String),
            title: expect.any(String),
            completed: expect.any(Boolean),
          },
        ]),
      });
      expect(resCompleted.body.data).toHaveLength(1);

      const resNotCompleted = await request
        .get('/api/todos')
        .query({ completed: false })
        .expect(200);
      expect(resNotCompleted.body.data).toHaveLength(2);
    });
  });

  describe('/POST todos', () => {
    it('should create a new todo', async () => {
      const res = await request
        .post('/api/todos')
        .send({
          todo: {
            title: 'my new todo',
          },
        } satisfies AddTodoRequest)
        .expect(200);

      expect(res.body).toMatchObject<AddTodoResponse>({
        data: expect.objectContaining<Todo>({
          id: expect.any(String),
          title: 'my new todo',
          completed: false,
        }),
      });
    });
  });

  describe('/PUT todos', () => {
    it('should update an existing todo', async () => {
      const newTodo = await request
        .post('/api/todos')
        .send({
          todo: {
            title: 'my new todo',
          },
        } satisfies AddTodoRequest)
        .expect(200);
      const id = (newTodo.body as AddTodoResponse).data!.id;

      const res = await request
        .put(`/api/todos/${id}`)
        .send({
          todo: {
            id,
            title: 'my other todo',
            completed: true,
          },
        } satisfies UpdateTodoRequest)
        .expect(200);

      expect(res.body).toMatchObject<UpdateTodoResponse>({
        data: expect.objectContaining<Todo>({
          id,
          title: 'my other todo',
          completed: true,
        }),
      });
    });
  });

  describe('/DELETE todos', () => {
    it('should return the deleted todo', async () => {
      const todos = await request.get('/api/todos').expect(200);
      expect(todos.body.data).toHaveLength(3);

      const todoToDelete = todos.body.data[0] as Todo;
      const res = await request.del(`/api/todos/${todoToDelete.id}`).expect(200);

      expect(res.body).toMatchObject<UpdateTodoResponse>({
        data: expect.objectContaining<Todo>(todoToDelete),
      });

      // Get todos again and verify it was deleted
      const todosRes = await request.get('/api/todos').expect(200);
      expect(todosRes.body.data).toHaveLength(2);
    });
  });
});
