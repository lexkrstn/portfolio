import * as tags from './tags/actions';
import * as work from './work/actions';
import * as works from './works/actions';

export { tags, work, works };
export type AllActions = tags.AllActions | work.AllActions | works.AllActions;
