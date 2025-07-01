import avt from '../assets/avt_nqd.jpg'

export const authApi = {
    login: ({ email, password }) => {
        console.log("Fake api using: ", { email, password })
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'dat@gmail.com' && password === '12345') {
                    console.log("Login successful")
                    const user = {
                        name: 'NGUYEN QUOC DAT',
                        avatarUrl: avt,
                        token: 'fake-jwt-token-12345',
                    }
                    resolve(user)
                } else {
                    console.log("Login failed")
                    reject(new Error("Wrong mail or pass"))
                }
            }, 1000)
        })
    },
}