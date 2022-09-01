import { RootState } from '../../../../rootReducer';

export const selectContactFormLoading = (state: RootState) => state.app.contactForm.loading;
