import { createContext, useState } from 'react'

type UsersProfileContextType = {
    street?: string,
    city?: string,
    country?: string,
    postalCode?: string,
    phoneNumber?: string,
    setStreet: (value: string) => void,
    setCity: (value: string) => void,
    setCountry: (value: string) => void,
    setPostalCode: (value: string) => void,
    setPhoneNumber: (value: string) => void
}

export const UsersProfileContext = createContext<UsersProfileContextType>({
    street: "",
    city: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    setStreet: () => {},
    setCity: () => {},
    setCountry: () => {},
    setPostalCode: () => {},
    setPhoneNumber: () => {}
});

export const UsersProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    return (
        <UsersProfileContext.Provider value={{
            street,
            city,
            country,
            postalCode,
            phoneNumber,
            setStreet,
            setCity,
            setCountry,
            setPostalCode,
            setPhoneNumber
        }}>
            {children}
        </UsersProfileContext.Provider>
    );
}   

