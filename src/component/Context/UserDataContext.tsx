import { createContext, useState } from 'react'

type UsersContextType = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    ComfirmPassword?: string,
    accessToken?: string,
    setFirstName: (value: string) => void,
    setLastName: (value: string) => void,
    setEmail: (value: string) => void,
    setPassword?: (value: any) => void,
    setComfirmPassword?: (value: any) => void,
    setAccessToken?: (value: string) => void
}

export const UsersContext = createContext<UsersContextType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ComfirmPassword: "",
    accessToken: "",
    setFirstName: () => {},
    setLastName: () => {},
    setEmail: () => {},
    setPassword: () => {},
    setComfirmPassword: () => {},
    setAccessToken: () => {}
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ComfirmPassword, setComfirmPassword] = useState("");
    const [accessToken, setAccessToken] = useState("");
    return (
        <UsersContext.Provider value={{
            firstName,
            lastName,
            email,
            password,
            ComfirmPassword,
            accessToken,
            setFirstName,
            setLastName,
            setEmail,
            setPassword,
            setComfirmPassword,
            setAccessToken
        }}>
            {children}
        </UsersContext.Provider>
    );
}   

