const getUsers = () => JSON.parse(localStorage.getItem('mockUsers')) || []
const saveUsers = (users) => localStorage.setItem('mockUsers', JSON.stringify(users))

export const userApi = {
    fetchUsers: () => {
        console.log("Fetch all users...")
        return new Promise((resolve) => {
            setTimeout(() => {
                const users = getUsers()
                resolve(users)
            }, 300)
        })
    },

    createUser: ({ email, password, name, role }) => {
        console.log("Creating user...", { email, role })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getUsers()
                if (users.some(u => u.email === email)) {
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
                const newUsers = [...users, newUser]
                saveUsers(newUsers)
                resolve(newUser)
            }, 500)
        })
    },

    updateUserRole: ({ userId, newRole }) => {
        console.log(`API: Updating role for ${userId} to ${newRole}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = getUsers()
                const updatedUsers = users.map(u => u.id === userId ? { ...u, role: newRole } : u)
                saveUsers(updatedUsers)
                resolve({ success: true })
            }, 500)
        })
    },

    deleteUser: (userId) => {
        console.log(`API: Deleting user ${userId}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let users = getUsers()
                const userToDelete = users.find(u => u.id === userId)
                if (userToDelete && userToDelete === 'boss') {
                    return reject(new Error('Khong the xoa nguoi nay'))
                }
                const newUsers = users.filter(u => u.id !== userId)
                saveUsers(newUsers)
                resolve({ success: true })
            }, 500)
        })
    }
}