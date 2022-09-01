import { RootState } from '../../../../rootReducer';

export const selectContactDialogOpen = (state: RootState) => state.app.contactDialog.open;
