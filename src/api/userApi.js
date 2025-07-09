import { authApi } from "./authApi";

let mockUsers = authApi.getMockUsers()
const saveUsers = () => authApi.setMockUsers(mockUsers)

export const userApi = {
    fetchUsers: () => {
        console.log("Fetch all users...")
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...mockUsers])
            }, 300)
        })
    },

    createUser: ({ email, password, name, role }) => {
        console.log("Creating user...", { email, role })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (mockUsers.some(u => u.email === email)) {
                    return reject(new Error("Email da ton tai"))
                }
                const newUser = {
                    id: `user-normal-${new Date().getTime()}`,
                    email,
                    password,
                    name,
                    role,
                    avatarUrl: `https://placehold.co/100x100/393844/FFF?text=${name.charAt(0).toUpperCase()}`,
                }
                mockUsers.push(newUser)
                saveUsers()
                resolve(newUser)
            }, 500)
        })
    },

    updateUserRole: ({ userId, newRole }) => {
        console.log(`API: Updating role for ${userId} to ${newRole}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                mockUsers = mockUsers.map(u => u.id === userId ? { ...u, role: newRole } : u)
                saveUsers()
                resolve({ success: true })
            }, 500)
        })
    },

    deleteUser: (userId) => {
        console.log(`API: Deleting user ${userId}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const userToDelete = mockUsers.find(u => u.id === userId)
                if (userToDelete && userToDelete === 'boss') {
                    return reject(new Error('Khong the xoa nguoi nay'))
                }
                mockUsers = mockUsers.filter(u => u.id !== userId)
                saveUsers()
                resolve({ success: true })
            }, 500)
        })
    }
}