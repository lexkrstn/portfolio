import { RouteConfig } from 'react-router-config';
import About from './pages/About';
import App from './pages/_App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Portfolio from './pages/Portfolio';
import Work from './pages/Work';

const routeConfig: RouteConfig[] = [{
  component: App,
  routes: [
    {
      component: Home,
      exact: true,
      path: '/',
    },
    {
      component: Portfolio,
      exact: true,
      path: '/portfolio',
    },
    {
      component: Work,
      path: '/portfolio/:id',
    },
    {
      component: About,
      path: '/about',
    },
    {
      component: NotFound,
      path: '*',
    },
  ],
}];

export default routeConfig;
