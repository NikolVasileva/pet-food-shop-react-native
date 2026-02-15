import { createContext } from "react";

export default function AuthProvider({ children }) {

    const AuthContext = createContext();
    
    const contextValue = {}

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}