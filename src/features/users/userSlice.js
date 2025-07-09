import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [],
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Sau khi thực hiện xong api sẽ chỉnh lại cho instant update,add,...
        fetchUsers(state) { state.status = 'loading'; },
        fetchUsersSuccess(state, action) { state.status = 'succeeded'; state.userList = action.payload; },
        fetchUsersFailure(state, action) { state.status = 'failed'; state.error = action.payload; },

        createUser(state, action) { /* Có thể set status loading riêng */ },
        createUserSuccess(state) { /* Saga sẽ fetch lại list */ },
        createUserFailure(state, action) { state.error = action.payload; },

        updateUserRole(state, action) { /* ... */ },
        updateUserRoleSuccess(state) { /* ... */ },
        updateUserRoleFailure(state, action) { state.error = action.payload; },

        deleteUser(state, action) { /* ... */ },
        deleteUserSuccess(state) { /* ... */ },
        deleteUserFailure(state, action) { state.error = action.payload; },
    },
})

export const {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
} = userSlice.actions

export default userSlice.reducer