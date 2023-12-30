import server from 'bunrest';
import { TodoController } from '../controllers';

const app = server();
const router = app.router();

router.get('/', TodoController.getTodos);
router.post('/', TodoController.createTodo);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

export const TodoRoutes = router;
