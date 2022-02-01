import { createExpressApp } from './app';
import { createServer } from './server';

function bootstrap() {
  const app = createExpressApp();
  createServer(app);
}
bootstrap();
