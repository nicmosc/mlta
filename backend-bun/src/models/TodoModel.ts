import mongoose from 'mongoose';
import { Todo } from '../../schema';

const todoSchema = new mongoose.Schema<Todo>({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
});

todoSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

todoSchema.set('toJSON', {
  virtuals: true,
});

export const TodoModel = mongoose.model<Todo>('Todo', todoSchema);
