import { createSlice } from "@reduxjs/toolkit";

const filterUsers = (allUsers, roleFilter) => {
    if (roleFilter === 'all') {
        return allUsers
    }
    return allUsers.filter(u => u.role === roleFilter)
}

const initialState = {
    userList: [],
    filteredUserList: [],
    status: 'idle',
    error: null,
    roleFilter: 'all',
    currentPage: 1,
    usersPerPage: 5
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Sau khi thực hiện xong api sẽ chỉnh lại cho instant update,add,...
        fetchUsers(state) { state.status = 'loading'; },
        fetchUsersSuccess(state, action) {
            state.status = 'succeeded';
            state.userList = action.payload;
            state.filteredUserList = filterUsers(state.userList, state.roleFilter)
        },
        fetchUsersFailure(state, action) { state.status = 'failed'; state.error = action.payload; },

        setRoleFilter(state, action) {
            state.roleFilter = action.payload
            state.currentPage = 1
            state.filteredUserList = filterUsers(state.userList, state.roleFilter)
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

        createUser(state, action) { state.status = 'loading' },
        createUserSuccess(state) {
            state.status = 'succeeded'
            const newUser = action.payload
            state.userList.push(newUser)
            state.filteredUserList = filterUsers(state.userList, state.roleFilter)
            state.error = null
        },
        createUserFailure(state, action) {
            state.status = 'failed'
            state.error = action.payload;
        },

        updateUserRole(state, action) { state.status = 'loading' },
        updateUserRoleSuccess(state) { /* ... */
            state.status = 'succeeded'
            const updatedUser = action.payload
            const userIndex = state.userList.findIndex(u => u.userId === updatedUser.userId)
            if (userIndex !== -1) {
                state.userList[userIndex] = updatedUser
                state.filteredUserList = filterUsers(state.userList, state.roleFilter)
            }
            state.error = null
        },
        updateUserRoleFailure(state, action) { state.error = action.payload; },

        deleteUser(state, action) { state.status = 'loading' },
        deleteUserSuccess(state) {
            state.status = 'succeeded'
            const deletedUserId = action.payload
            state.userList = state.userList.filter(u => u.userId !== deletedUserId)
            state.filteredUserList = filterUsers(state.userList, state.roleFilter)
            state.error = null
        },
        deleteUserFailure(state, action) {
            state.error = action.payload;
            state.status = 'failed'
        },
    },
})

export const {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
    setRoleFilter, setCurrentPage,
} = userSlice.actions

export default userSlice.reducer