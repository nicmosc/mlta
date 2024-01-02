export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodosRequest {
  completed?: boolean;
}
export type TodosResponse = Todo[] | undefined;
export type GetTodos = (args: TodosRequest) => TodosResponse;

export interface AddTodoRequest {
  title: string;
}
export type AddTodoResponse = Todo | undefined;
export type AddTodo = (args: AddTodoRequest) => AddTodoResponse;

export interface DeleteTodoRequest {
  id: string;
}
export type DeleteTodoResponse = Todo | undefined;
export type DeleteTodo = (args: DeleteTodoRequest) => DeleteTodoResponse;

export interface UpdateTodoRequest {
  id: string;
  title?: string;
  completed?: boolean;
}
export type UpdateTodoResponse = Todo | undefined;
export type UpdateTodo = (args: UpdateTodoRequest) => UpdateTodoResponse;
