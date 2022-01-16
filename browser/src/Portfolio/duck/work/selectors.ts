import { RootState } from '../../../rootReducer';

export const selectWork = (state: RootState) => state.portfolio.work.work;
export const selectWorkLoading = (state: RootState) => state.portfolio.work.loading;
export const selectWorkFetched = (state: RootState) => (
  state.portfolio.work.work || state.portfolio.work.error || state.portfolio.work.loading
);
