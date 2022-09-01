import { RootState } from '../../../../rootReducer';

export const selectSnackbar = (state: RootState) => state.app.snackbar;
export const selectSnackbarOpen = (state: RootState) => state.app.snackbar.open;
export const selectSnackbarMessage = (state: RootState) => state.app.snackbar.message;
export const selectSnackbarDuration = (state: RootState) => state.app.snackbar.duration;
export const selectSnackbarSeverity = (state: RootState) => state.app.snackbar.severity;
