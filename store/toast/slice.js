import { createSlice } from '@reduxjs/toolkit';

const generateId = () => (+new Date()).toString(16);

const openSuccessSnackbar = (state, message) => {
  const snackbar = {
    id: generateId(),
    variant: 'success',
    message,
    autoHideDuration: 5000,
  };
  state.items = state.items.concat(snackbar);
};

const openErrorSnackbar = (state, message) => {
  const snackbar = {
    id: generateId(),
    variant: 'error',
    message,
    autoHideDuration: 5000,
  };
  state.items = state.items.concat(snackbar);
};

const openInfoSnackbar = (state, message) => {
  const snackbar = {
    id: generateId(),
    variant: 'info',
    message,
    autoHideDuration: 5000,
  };
  state.items = state.items.concat(snackbar);
};

export const initialState = {
  open:false,
  message:'',
  variant:'',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openRequestStatusSuccessSnackbar(state, { payload }) {
      state.open=true
      state.message = payload;
      state.variant='success'
    },

    openRequestStatusErrorSnackbar(state, { payload }) {
      state.open=true
      state.message = payload;
      state.variant='error'
    },
    openRequestStatusInfoSnackbar(state, { payload }) {
      state.open=true
      state.message = payload;
      state.variant='info'
    },

    addSnackbar(state, { payload: snackbar }) {
      state.items = state.items.concat(snackbar);
    },

    removeSnackbar(state) {
      state.open=false
      state.message = '';
      state.variant=''
    },
  },
});

export const { actions } = toastSlice;

export default toastSlice.reducer
