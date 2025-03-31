import { createContext , useContext } from "react";
import { useState } from "react";

const UserContext = createContext(null);
    

export const UserProvider = ({children}) => {       
const [user,setUser] = useState({
    isAuthentified: false,
    email:''});

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const userContext = useContext(UserContext);
    if (userContext == null) {
        throw new Error('useUserContext must be used within a UserProvider');
    
    }
    return userContext;
}

export default UserProvider;





