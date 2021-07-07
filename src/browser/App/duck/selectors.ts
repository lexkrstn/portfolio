import { RootState } from '../../rootReducer';

export const getInitialNow = (state: RootState): number => state.app.initialNow;
