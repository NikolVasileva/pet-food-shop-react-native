import { createContext, useState } from "react";
import { authService } from "../../services";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const register = async (email, password) => {
        try {
            setIsLoading(true)
            const userData = await authService.register(email, password)
            setUser(userData)
        } catch(err) {
            alert(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email, password) => {
        const userData = await authService.login(email, password)
        setUser(userData)
    }

    const contextValue = {
        user,
        login,
        register,
        isLoading,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}