import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: null,
        convers: [],
    },
    reducers: {
        Logins: (state, action) => {
            state.users = action.payload;
        },
        logout: (state) => {
            state.users = null;
        },
        Conversations: (state, action) => {
            const conversation = state.convers.find((item) => item._id === action.payload._id);
            if (conversation) {
                state.convers = [...state.convers]
            } else {
                state.convers = [...state.convers, action.payload];
            }
        },
        DeleteConversations: (state, action) => {
            const index = state.convers.findIndex((cover) => (cover._id === action.payload.id));
            let newConvers = [...state.convers];
            if (index >= 0) {
                newConvers.splice(index, 1);
            } else {
                console.warn(`Cant remove product (id:${action.payload})`)
            }
            state.convers = newConvers;
        }
    }
})
export const { Logins, Conversations, DeleteConversations, logout } = userSlice.actions;
export const selectLogin = state => state.user.users;
export const selectConversation = state => state.user.convers;
export const selectDeleteConversation = state => state.user.convers;
export default userSlice.reducer;

