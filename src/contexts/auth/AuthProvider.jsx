// import { createContext, useState } from "react";
// import { authService } from "../../services";

// export const AuthContext = createContext({
//     isLoading: false,
//     isAuthenticated: false,
//     error: null,
//     user: null,
//     auth: null,
//     login: async (email, password) => { },
//     register: async (email, password, name) => { },
//     clearError: () => { },
//     logout: () => { },
// });

// export default function AuthProvider({ children }) {

//     const [user, setUser] = useState(null);
//     const [auth, setAuth] = useState(null)
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
    

//     // const isAuthenticated = !!user;

//     const register = async (email, password) => {
//         try {
//             setIsLoading(true);
//             const { user, accessToken } = await authService.register(email, password);
    
//             // Ако user няма пълен обект, извличаме текущия
//             let fullUser = user;
//             if (!user.id) {
//                 fullUser = await authService.getCurrentUser(accessToken); // нов метод в authService
//             }
    
//             setUser(fullUser);
//             setAuth({ accessToken });
//             return { success: true };
//         } catch (err) {
//             let message = "Registration failed!";
//             if (err.response && err.response.status === 400) {
//                 message = err.response.data?.message || "Email already exists!";
//             } else if (err.message) {
//                 message = err.message;
//             }
    
//             setError(message);
//             return { success: false, message };
//         } finally {
//             setIsLoading(false);
//         }
//     };
//     // const register = async (email, password) => {
//     //     try {
//     //         setIsLoading(true);
//     //         const { user, accessToken } = await authService.register(email, password);
//     //         setUser(user);
//     //         return { success: true };
//     //     } catch (err) {
//     //         let message = "Registration failed!";
//     //         if (err.response && err.response.status === 400) {
//     //             message = err.response.data?.message || "Email already exists!";
//     //         } else if (err.message) {
//     //             message = err.message;
//     //         }
    
//     //         setError(message);
//     //         return { success: false, message };
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };


//     const login = async (email, password) => {
//         try {
//             setIsLoading(true);
//             const { user, accessToken } = await authService.login(email, password);
//             setUser(user);
//             setAuth({ accessToken })
//             return { success: true };
//         } catch (err) {
//             let message = "Login failed!";
//             if (err.response && err.response.status === 400) {
//                 message = err.response.data?.message || "Cannot find user";
//             } else if (err.message) {
//                 message = err.message;
//             }
    
//             setError(message);
//             return { success: false, message };
//         } finally {
//             setIsLoading(false);
//         }
//     }

//     const logout = () => {
//         setUser(null);
//         setAuth(null);
//         setIsLoading(false);
//         setError(null);
//     };

//     const contextValue = {
//         user,
//         auth,
//         login,
//         register,
//         isLoading,
//         isAuthenticated: !!user,
//         error,
//         clearError: () => setError(null),
//         logout,
//         setUser
//     }

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useState } from "react";
import { authService } from "../../services";
import { usePersistedState } from "./usePersistedState";

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
    const [auth, setAuth] = usePersistedState("auth", {
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

