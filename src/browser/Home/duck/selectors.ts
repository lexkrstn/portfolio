import { RootState } from '../../rootReducer';
import { WalkMode } from './WalkMode';

export const getWalkMode = (state: RootState): WalkMode => state.home.walkMode;
