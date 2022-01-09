import { RootState } from '../../rootReducer';

export const getContactDialogOpen = (state: RootState) => state.app.contactDialog.open;
export const getContactFormLoading = (state: RootState) => state.app.contactForm.loading;
export const getSnackbar = (state: RootState) => state.app.snackbar;
