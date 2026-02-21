import { createContext, use, useState } from "react";
import { authService } from "../../services";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

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
        const userData = await authService.login(email, password)
        setUser(userData)
    }

    const contextValue = {
        user,
        login,
        register,
        isLoading,
        error,
        clearError: () => setError(null)
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}