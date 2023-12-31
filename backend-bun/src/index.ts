import server from 'bunrest';
import cors from 'buncors';

import { TodoRoutes } from './routes';

const app = server();

app.use(cors());

app.use('/api/todos', TodoRoutes);

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
