import { createSlice } from "@reduxjs/toolkit";

const filterUsers = (allUsers, roleFilter) => {
    if (roleFilter === 'all') {
        return allUsers;
    }
    return allUsers.filter(u => u.role === roleFilter);
};

const initialState = {
    userList: [],
    filteredUserList: [],
    status: 'idle',
    error: null,
    roleFilter: 'all',
    currentPage: 1,
    usersPerPage: 5,
    _backupUserList: null,
    _backupFilteredUserList: null
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        fetchUsers(state) { state.status = 'loading'; },
        fetchUsersSuccess(state, action) {
            state.status = 'succeeded';
            state.userList = action.payload;
            state.filteredUserList = filterUsers(state.userList, state.roleFilter);
        },
        fetchUsersFailure(state, action) { state.status = 'failed'; state.error = action.payload; },

        setRoleFilter(state, action) {
            state.roleFilter = action.payload;
            state.currentPage = 1;
            state.filteredUserList = filterUsers(state.userList, state.roleFilter);
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },

        // ⬇ Optimistic create (kèm backup)
        createUser(state, action) {
            state.status = 'loading';
            state.error = null;
            const newUser = action.payload || {};
            state._backupUserList = [...state.userList];
            state._backupFilteredUserList = [...state.filteredUserList];

            // nếu server chưa trả userId, cấp tạm id
            const userToInsert = {
                ...newUser,
                userId: newUser.userId ?? `temp-${Date.now()}`
            };
            state.userList.push(userToInsert);
            state.filteredUserList = filterUsers(state.userList, state.roleFilter);
        },
        createUserSuccess(state, action) {
            state.status = 'succeeded';

            const createdUserFromServer = action.payload || {};
            const tempId = state.userList.find(
                u => typeof u.userId === 'string' && u.userId.startsWith('temp-')
            )?.userId;

            if (tempId) {
                const idx = state.userList.findIndex(u => u.userId === tempId);
                if (idx !== -1) {
                    state.userList[idx] = {
                        ...state.userList[idx],
                        ...createdUserFromServer,
                        userId: createdUserFromServer.userId // dùng id thật từ server
                    };
                }
            }

            state.filteredUserList = filterUsers(state.userList, state.roleFilter);
            state._backupUserList = null;
            state._backupFilteredUserList = null;
        },

        createUserFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
            if (state._backupUserList) state.userList = state._backupUserList;
            if (state._backupFilteredUserList) state.filteredUserList = state._backupFilteredUserList;
            state._backupUserList = null;
            state._backupFilteredUserList = null;
        },

        // ⬇ Optimistic update role (merge thay vì replace)
        updateUserRole(state, action) {
            state.status = 'loading';
            state.error = null;
            const payload = action.payload || {};

            // chuẩn hóa: payload có thể là { userId, newRole } hoặc full user object
            const candidateUserId = payload.userId ?? payload.id ?? payload.userId;
            const roleFromPayload = payload.newRole ?? payload.role;

            state._backupUserList = [...state.userList];
            state._backupFilteredUserList = [...state.filteredUserList];

            const idx = state.userList.findIndex(u => (u.userId ?? u.id) === candidateUserId);
            if (idx !== -1) {
                const existing = state.userList[idx];
                // merge: chỉ overwrite các trường có trong payload (và normalize role)
                const merged = {
                    ...existing,
                    ...payload,
                    ...(roleFromPayload !== undefined ? { role: roleFromPayload } : {})
                };
                // ensure userId preserved
                merged.userId = existing.userId ?? existing.id ?? merged.userId;
                state.userList[idx] = merged;
                state.filteredUserList = filterUsers(state.userList, state.roleFilter);
            }
        },
        updateUserRoleSuccess(state, action) {
            state.status = 'succeeded';
            state._backupUserList = null;
            state._backupFilteredUserList = null;
            // if backend returned authoritative user object, you could replace it here:
            // const updatedUser = action.payload ?? null;
            // if (updatedUser) { ...replace matching user... }
        },
        updateUserRoleFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
            if (state._backupUserList) state.userList = state._backupUserList;
            if (state._backupFilteredUserList) state.filteredUserList = state._backupFilteredUserList;
            state._backupUserList = null;
            state._backupFilteredUserList = null;
        },

        // ⬇ Optimistic delete
        deleteUser(state, action) {
            state.status = 'loading';
            state.error = null;
            const deletedUserId = action.payload;
            state._backupUserList = [...state.userList];
            state._backupFilteredUserList = [...state.filteredUserList];

            state.userList = state.userList.filter(u => (u.userId ?? u.id) !== deletedUserId);
            state.filteredUserList = filterUsers(state.userList, state.roleFilter);
        },
        deleteUserSuccess(state) {
            state.status = 'succeeded';
            state._backupUserList = null;
            state._backupFilteredUserList = null;
        },
        deleteUserFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
            if (state._backupUserList) state.userList = state._backupUserList;
            if (state._backupFilteredUserList) state.filteredUserList = state._backupFilteredUserList;
            state._backupUserList = null;
            state._backupFilteredUserList = null;
        },
    },
});

export const {
    fetchUsers, fetchUsersFailure, fetchUsersSuccess,
    createUser, createUserFailure, createUserSuccess,
    updateUserRole, updateUserRoleFailure, updateUserRoleSuccess,
    deleteUser, deleteUserFailure, deleteUserSuccess,
    setRoleFilter, setCurrentPage,
} = userSlice.actions;

export default userSlice.reducer;
