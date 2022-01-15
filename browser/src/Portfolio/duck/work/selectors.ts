import { RootState } from '../../../rootReducer';
import { Work } from '../../interfaces';

export const selectWork = (state: RootState): Work => state.portfolio.work.work;
export const selectWorkLoading = (state: RootState): boolean => state.portfolio.work.loading;
