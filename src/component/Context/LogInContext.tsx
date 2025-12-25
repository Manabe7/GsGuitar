import { createContext, useState } from 'react'

type AuthContextType = {
    isLoggedIn: boolean,
    setIsLoggedIn?: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({ isLoggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}   

