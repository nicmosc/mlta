import { BunRequest } from 'bunrest/src/server/request';
import { BunResponse } from 'bunrest/src/server/response';
import { connectToDatabase, disconnectFromDatabase } from '../db';
import { TodoModel } from '../models';
import { AddTodo, DeleteTodo, GetTodos, Todo, UpdateTodo } from '../../schema';
import { Error, HydratedDocument } from 'mongoose';

// TODO - move this to a service layer
// for now it will do
function mapModelToResponse(value: HydratedDocument<Todo>): Todo {
  return {
    id: value.id,
    title: value.title,
    completed: value.completed,
  };
}

const getTodos = async (req: BunRequest, res: BunResponse) => {
  const getTodoDto = req.query as Parameters<GetTodos>[0];
  try {
    await connectToDatabase();
    const todos = await TodoModel.find({
      ...(getTodoDto.completed ? { completed: getTodoDto.completed } : {}),
    }).exec();
    const response = { data: todos.map(mapModelToResponse) } satisfies ReturnType<GetTodos>;
    await disconnectFromDatabase();
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

const createTodo = async (req: BunRequest, res: BunResponse) => {
  const createTodoDto = req.body as Parameters<AddTodo>[0];
  try {
    await connectToDatabase();
    const title = createTodoDto.todo.title;
    const todo = await TodoModel.create({
      title,
      completed: false,
    });
    const response = { data: mapModelToResponse(todo) } satisfies ReturnType<AddTodo>;
    await disconnectFromDatabase();
    return res.status(200).json(response);
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

const deleteTodo = async (req: BunRequest, res: BunResponse) => {
  const deleteTodoId = (req.params as Parameters<DeleteTodo>[0]).id;
  try {
    await connectToDatabase();
    const todo = await TodoModel.findById(deleteTodoId);
    await TodoModel.findByIdAndDelete(deleteTodoId);
    await disconnectFromDatabase();
    if (!todo) {
      return res.status(404).json({ message: `Could not find Todo with id: ${deleteTodoId}` });
    } else {
      const response = { data: mapModelToResponse(todo) } satisfies ReturnType<DeleteTodo>;
      return res.status(200).json(response);
    }
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

const updateTodo = async (req: BunRequest, res: BunResponse) => {
  const updateTodoId = (req.params as Parameters<UpdateTodo>[0]).id;
  const updateTodoDto = req.body as Parameters<UpdateTodo>[0];
  await connectToDatabase();
  try {
    const todo = await TodoModel.findByIdAndUpdate(updateTodoId, updateTodoDto.todo, {
      returnDocument: 'after',
    });
    if (!todo) {
      return res.status(404).json({ message: `Could not find Todo with id: ${updateTodoId}` });
    } else {
      const response = { data: mapModelToResponse(todo) } satisfies ReturnType<UpdateTodo>;
      return res.status(200).json(response);
    }
  } catch (e: unknown) {
    console.error(e);
    if (e instanceof Error) {
      return res.status(500).json({ message: e.message });
    }
    return res.status(500).json({ message: `Something went wrong: ${e}` });
  }
};

export const TodoController = {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
};
