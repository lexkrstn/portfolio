import { RouteConfig } from 'react-router-config';

/**
 * Returns the first parameter given is a root route like "/" or "/portfolio"
 * rather than any subroute like "/portfolio/:id".
 *
 * The function is designed to use as a filter predicate, thus the index
 * parameter is required despite of not being used.
 */
export function isRootRoute(route: RouteConfig, routes: RouteConfig[]): boolean {
  if (route.path === '/') {
    return true;
  }
  if (route.path === '*' || (typeof route.path !== 'string' && !(route.path instanceof String))) {
    return false;
  }
  for (const aRoute of routes) {
    const aPath = aRoute.path;
    if (
      (typeof aPath === 'string' || (aPath instanceof String))
      && aPath !== '*'
      && aPath !== '/'
      && route.path.startsWith(`${aPath}/`)
    ) {
      return false;
    }
  }
  return true;
}
