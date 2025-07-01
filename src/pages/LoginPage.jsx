import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { replace, useNavigate } from "react-router-dom"
import { loginStart } from "../features/auth/authSlice"
import { Eye, EyeOff } from "lucide-react"


const LoginPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated, status, error } = useSelector((state) => state.auth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (status !== 'loading') {
            dispatch(loginStart({ email, password }))
        }
    }

    const isLoading = status === 'loading'

    return (
        <div className="min-h-screen bg-[#201f2b] text-white flex flex-col">
            <header className="p-4 sm:p-6">
                <div className="flex items-center space-x-2">
                    <span>Logo gì đó ở đây</span>
                    <span className="text-xl font-bold text-red-500">THƯ VIỆN SỐ</span>
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-wider">THƯ VIỆN SỐ</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nhap email */}
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-400">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-4 py-3 bg-[#2d2c35] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        {/* Nhap mat khau */}
                        <div>
                            <label htmlFor="password" className="text-sm font-medium text-gray-400">Mật khẩu</label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-3 bg-[#2d2c35] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter your password"
                                />
                                {/* Hide/Show password */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Processing...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>

            </main>
        </div>
    )
}

export default LoginPage