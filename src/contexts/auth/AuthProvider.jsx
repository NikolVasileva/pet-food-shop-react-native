import { createContext, useState } from "react";
import { authService } from "../../services";
import { useSecureState } from "./useSecureState";

export const AuthContext = createContext({
    isLoading: false,
    isAuthenticated: false,
    error: null,
    user: null,
    auth: null,
    login: async () => {},
    register: async () => {},
    clearError: () => {},
    logout: () => {},
});

export default function AuthProvider({ children }) {
    const [auth, setAuth, isHydrated] = useSecureState("auth", {
        accessToken: null,
        user: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (email, password) => {
        try {
            setIsLoading(true);

            const { user, accessToken } = await authService.register(email, password);

            let fullUser = user;

            if (!user?.id) {
                fullUser = await authService.getCurrentUser(accessToken);
            }

            setAuth({
                user: fullUser,
                accessToken,
            });

            return { success: true };
        } catch (err) {
            let message = "Registration failed!";

            if (err.response?.status === 400) {
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

            setAuth({
                user,
                accessToken,
            });

            return { success: true };
        } catch (err) {
            let message = "Login failed!";

            if (err.response?.status === 400) {
                message = err.response.data?.message || "Cannot find user";
            } else if (err.message) {
                message = err.message;
            }

            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setAuth({
            accessToken: null,
            user: null,
        });
        setError(null);
    };

    const contextValue = {
        user: auth.user,
        auth,
        setAuth,
        isHydrated,
        login,
        register,
        isLoading,
        isAuthenticated: !!auth.user,
        error,
        clearError: () => setError(null),
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

