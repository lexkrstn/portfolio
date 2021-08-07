import About from './About';
import App from './App';
import Home from './Home';
import NotFound from './NotFound';
import Portfolio from './Portfolio';
import Work from './Portfolio/Work';
import { RouteConfig } from 'react-router-config';

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
