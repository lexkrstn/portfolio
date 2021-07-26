import { RootState } from '../../../rootReducer';
import Work from './Work';

export const getWorks = (state: RootState): Work[] => state.portfolio.works.works;
export const areLoading = (state: RootState): boolean => state.portfolio.works.loading;
export const getSelectedId = (state: RootState): number => state.portfolio.works.selectedId;
