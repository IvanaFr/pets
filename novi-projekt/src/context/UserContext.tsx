import { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [adminRole, setAdminRole] = useState("user");

    const toggleAdminRole = () => {
        setAdminRole(adminRole === "user" ? "admin" : "user");
    };

    return (
        <UserContext.Provider value={{ adminRole, toggleAdminRole }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
