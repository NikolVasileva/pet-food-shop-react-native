import { createContext, useState } from "react";
import { authService } from "../../services";

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    auth: null,
    login: async (email, password) => { },
    register: async (email, password, name) => { },
    clearError: () => { },
    logout: () => { },
});

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const isAuthenticated = !!user;

    const register = async (email, password) => {
        try {
            setIsLoading(true);
            const userData = await authService.register(email, password);
            setUser(userData);
            return { success: true };
        } catch (err) {
            let message = "Registration failed!";
            if (err.response && err.response.status === 400) {
                message = err.response.data?.message || "Email already exists!";
            } else if (err.message) {
                message = err.message;
            }
    
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const { user, accessToken } = await authService.login(email, password);
            setUser(user);
            setAuth({ accessToken })
            return { success: true };
        } catch (err) {
            let message = "Login failed!";
            if (err.response && err.response.status === 400) {
                message = err.response.data?.message || "Cannot find user";
            } else if (err.message) {
                message = err.message;
            }
    
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () => {
        setUser(null);
        setAuth(null);
    };

    const contextValue = {
        user,
        auth,
        login,
        register,
        isLoading,
        isAuthenticated: !!user,
        error,
        clearError: () => setError(null),
        logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}