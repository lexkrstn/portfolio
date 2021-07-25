import { RootState } from '../../rootReducer';
import { WalkMode } from './types';

export const getWalkMode = (state: RootState): WalkMode => state.home.walkMode;
