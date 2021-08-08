import { RootState } from '../../../rootReducer';
import Work from './Work';

export const getWork = (state: RootState): Work => state.portfolio.work.work;
export const isLoading = (state: RootState): boolean => state.portfolio.work.loading;
