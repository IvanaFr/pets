import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userRole, setUserRole] = useState("user");

    const toggleUserRole = () => {
        setUserRole(userRole === "user" ? "admin" : "user");
    };

    return (
        <UserContext.Provider value={{ userRole, toggleUserRole }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
