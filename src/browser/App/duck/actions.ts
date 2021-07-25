import { INITIAL_NOW_SET, InitialNowSetAction } from './types';

/**
 * Creates an action that sets initial application construction time.
 *
 * The time is used to synchronize time-depended content on server and
 * client side while rendering it the first time. Such an approach is
 * required for React not to rerender the markup rendered by the server
 * redundantly just after its loading.
 *
 * @param time Unix time in milliseconds or a Date object.
 */
export function setInitialNow(time: number | Date): InitialNowSetAction {
  return {
    payload: time instanceof Date ? time.getTime() : time,
    type: INITIAL_NOW_SET,
  };
}
