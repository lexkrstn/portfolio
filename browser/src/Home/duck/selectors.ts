import { RootState } from '../../rootReducer';

export const selectWalkMode = (state: RootState) => state.home.walkMode;
