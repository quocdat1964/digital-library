import axiosInstance from "../utils/axiosInstance";

const userService = {
    getAllUsers: async () => {
        try {
            const response = await axiosInstance.get('/users')
            return response.data;
        } catch (error) {
            console.error('Failed to fetch all users:', error.response?.data || error.message);
            throw error;
        }
    },
    getUserById: async (userId) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}`)
            return response.data
        } catch (error) {
            console.error(`Failed to fetch user with ID ${userId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    createUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users', userData)
            return response.data;
        } catch (error) {
            console.error('Failed to create user:', error.response?.data || error.message);
            throw error;
        }
    },
    updateUser: async (userId, userData) => {
        try {
            const response = await axiosInstance.put(`/users/${userId}`, userData)
            return response.data
        } catch (error) {
            console.error(`Failed to update user with ID ${userId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    updateUserRole: async (userId, newRole) => {
        try {
            const response = await axiosInstance.patch(`/users/${userId}/role`, { newRole: newRole })
            return response.data
        } catch (error) {
            console.error(`Failed to update role for user with ID ${userId}:`, error.response?.data || error.message);
            throw error;
        }
    },
    deleteUser: async (userId) => {
        try {
            await axiosInstance.delete(`/users/${userId}`)
        } catch (error) {
            console.error(`Failed to delete user with ID ${userId}:`, error.response?.data || error.message);
            throw error;
        }
    }
}

export default userService;