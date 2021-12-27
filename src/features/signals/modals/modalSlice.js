import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalShowing: false,
    modalConfirmationCallback: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal({ modalShowing, modalConfirmationCallback }, action) {
            modalShowing = true
            modalConfirmationCallback = action.payload.callback
        },
        hideModal({ modalShowing, modalConfirmationCallback }, action) {
            modalShowing = false
            modalConfirmationCallback = null
        }
    }
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer