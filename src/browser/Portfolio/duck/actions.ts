import * as tags from './tags/actions';
import * as works from './works/actions';

export { tags, works };
export type AllActions = tags.AllActions | works.AllActions;
