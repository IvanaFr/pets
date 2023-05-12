import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const RoleCheckbox = () => {
    const { adminRole, toggleAdminRole } = useContext(UserContext);

    return (
        <div>
            <label>Admin</label>
            <input
                type="checkbox"
                id="roleCheckbox"
                checked={adminRole === "admin"}
                onChange={toggleAdminRole}
            />
        </div>
    );
};

export default RoleCheckbox;
