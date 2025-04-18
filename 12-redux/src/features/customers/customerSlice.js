import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fullName: '',
    natioanlId: '',
    createdAt: ''
};
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer: {
            prepare(fullName, natioanlId) {
                return {
                    payload: {
                        fullName,
                        natioanlId,
                        createdAt: new Date().toISOString()
                    }
                };
            },
            reducer(state, action) {
                state.fullName = action.payload.fullName;
                state.natioanlId = action.payload.natioanlId;
                state.createdAt = action.payload.createdAt;
            }
        },
        updateName(state, action) {
            state.fullName = action.payload;
        }
    }
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
