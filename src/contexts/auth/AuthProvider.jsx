import { createContext, useState } from "react";
import { authService } from "../../services";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const register = async (email, password) => {
        try {
            const userData = await authService.register(email, password)
            setUser(useState)
        } catch(err) {
            alert(err.message)
        }
    }

    const login = async (email, password) => {
        const userData = await authService.login(email, password)
        setUser(useState)
    }

    const contextValue = {
        user,
        login,
        register,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}