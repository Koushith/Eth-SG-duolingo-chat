import { createContext, useContext, useState } from "react";

export const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(null);


   

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {

    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};