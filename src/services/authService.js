import axiosInstance from "../utils/axiosInstance";

const authService = {
    login: async (email, password) => {
        try {
            localStorage.removeItem('jwtToken');
            const response = await axiosInstance.post('/auth/login', { email, password })
            const token = response.data.token
            if (token) {
                localStorage.setItem('jwtToken', token);
            }
            return response.data;
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    },
    logout: () => {
        localStorage.removeItem('jwtToken')
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('jwtToken')
    }
}

export default authService;