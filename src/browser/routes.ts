import About from './About';
import App from './App';
import Home from './Home';
import NotFound from './NotFound';
import Portfolio from './Portfolio';

export default [{
  component: App,
  routes: [
    {
      component: Home,
      exact: true,
      path: '/',
    },
    {
      component: Portfolio,
      path: '/portfolio',
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
