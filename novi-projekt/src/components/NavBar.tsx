import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    //NavBtn,
    //NavBtnLink,
} from "./NavbarElements";
import logo from "../assets/logo.png";

import RoleCheckbox from "./RoleCheckbox";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="Logo"
                        style={{ height: "50px", width: "50px" }}
                    />
                </NavLink>
                <NavMenu>
                    <NavLink to="/about">O nama</NavLink>
                    <NavLink to="/popis">Popis</NavLink>
                    <NavLink to="/donacije">Donacije</NavLink>
                    <NavLink to="/obavijesti">Obavijesti</NavLink>
                    <RoleCheckbox />
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
