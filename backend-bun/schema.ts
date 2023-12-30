export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosRequest {
  completed?: boolean;
}
export interface TodosResponse {
  data?: Todo[];
}
export type GetTodos = (args: TodosRequest) => TodosResponse;

export interface AddTodoRequest {
  todo: {
    title: string;
  };
}
export interface AddTodoResponse {
  data?: Todo;
}
export type AddTodo = (args: AddTodoRequest) => AddTodoResponse;

export interface DeleteTodoRequest {
  id: string;
}
export interface DeleteTodoResponse {
  data?: Todo;
}
export type DeleteTodo = (args: DeleteTodoRequest) => DeleteTodoResponse;

export interface UpdateTodoRequest {
  id: string;
  todo: {
    title?: string;
    completed?: boolean;
  };
}
export interface UpdateTodoResponse {
  data?: Todo;
}
export type UpdateTodo = (args: UpdateTodoRequest) => UpdateTodoResponse;
