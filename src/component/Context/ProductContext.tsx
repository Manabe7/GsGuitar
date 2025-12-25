import { createContext, useState } from 'react'

type ProductContextType = {
    productID?: string;
    name?: string;
    price: number;
    quantity?: number;
    image?: string;
    setProductID: (value: string) => void;
    setName: (value: string) => void;
    setPrice: (value: number) => void;
    setQuantity: (value: number) => void;
    setImage: (value: string) => void;
};

export const ProductContext = createContext<ProductContextType>({
    productID: "",
    name: "",
    price: 0,
    quantity: 0,
    image: "",
    setProductID: () => {},
    setName: () => {},
    setPrice: () => {},
    setQuantity: () => {},
    setImage: () => {}
});

export const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState("");
    return (
        <ProductContext.Provider value={{
            productID,
            name,
            price,
            quantity,
            image,
            setProductID,
            setName,
            setPrice,
            setQuantity,
            setImage
        }}>
            {children}
        </ProductContext.Provider>
    );
}   

