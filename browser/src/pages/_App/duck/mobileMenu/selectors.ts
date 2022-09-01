import { RootState } from '../../../../rootReducer';

export const selectMobileMenuOpen = (state: RootState) => state.app.mobileMenu.open;
