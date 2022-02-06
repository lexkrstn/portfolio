import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export type OpenMobileMenuAction = PayloadAction<void>;
export type CloseMobileMenuAction = PayloadAction<void>;

const slice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    openMobileMenu(state) {
      state.open = true;
    },
    closeMobileMenu(state) {
      state.open = false;
    },
    toggleMobileMenu(state) {
      state.open = !state.open;
    },
  },
});

export const { closeMobileMenu, openMobileMenu, toggleMobileMenu } = slice.actions;
export default slice.reducer;
