import avt from '../assets/avt_nqd.jpg'

const mockUsers = [
    {
        id: 'user-boss-001',
        email: 'boss@test.com',
        password: '123',
        name: 'Boss',
        role: 'boss',
        avatarUrl: 'https://placehold.co/100x100/393844/FFF?text=B'
    },
    {
        id: 'user-admin-002',
        email: 'admin@test.com',
        password: '123',
        name: 'Admin',
        role: 'admin',
        avatarUrl: 'https://placehold.co/100x100/393844/FFF?text=A'
    },
    {
        id: 'user-normal-003',
        email: 'user@test.com',
        password: '123',
        name: 'User',
        role: 'user',
        avatarUrl: 'https://placehold.co/100x100/393844/FFF?text=U1'
    },
    {
        id: 'user-normal-004',
        email: 'user2@test.com',
        password: '123',
        name: 'User2',
        role: 'user',
        avatarUrl: 'https://placehold.co/100x100/393844/FFF?text=U2'
    },
]

export const authApi = {
    login: ({ email, password }) => {
        console.log("Fake api using: ", { email, password })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = mockUsers.find(u => u.email === email && u.password === password)

                if (user) {
                    console.log('API: Login successful for user:', user.name, 'with role:', user.role);
                    const token = btoa(JSON.stringify({ userId: user.id, role: user.role }))
                    localStorage.setItem('authToken', token)
                    localStorage.setItem('currentUser', JSON.stringify(user))
                    resolve({ user, token })
                } else {
                    console.log('API: Login failed');
                    reject(new Error('Email hoặc mật khẩu không chính xác'));
                }
            }, 500)
        })
    },
    logout: () => {
        return new Promise((resolve) => {
            localStorage.removeItem('authToken')
            localStorage.removeItem('currentUser')
            resolve({ success: true })
        })
    },
    validateToken: (token) => {
        console.log("validating token...")
        return new Promise((resolve, reject) => {
            try {
                const decodedPayload = JSON.parse(atob(token))
                const { userId } = decodedPayload

                const user = mockUsers.find(u => u.id === userId)
                if (user) {
                    console.log("API: Token is valid. User found:", user.name);
                    // Trong thực tế, backend sẽ trả về object user mới nhất
                    resolve({ user });
                } else {
                    reject(new Error("Token không hợp lệ hoặc người dùng không tồn tại."));
                }
            } catch (error) {
                reject(new Error("Khong the giai ma token"))
            }
        })
    },
    getMockUsers: () => mockUsers,
    setMockUsers: (newUsers) => { mockUsers = newUsers; },
}