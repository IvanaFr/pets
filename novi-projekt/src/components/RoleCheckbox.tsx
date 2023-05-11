import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RoleCheckbox = () => {
    const { userRole, toggleUserRole } = useContext(UserContext);

    return (
        <div>
            <label>Admin</label>
            <input
                type="checkbox"
                id="roleCheckbox"
                checked={userRole === "admin"}
                onChange={toggleUserRole}
            />
        </div>
    );
};

export default RoleCheckbox;
