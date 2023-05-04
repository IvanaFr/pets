import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
//NavBtn,
//NavBtnLink,
} from './NavbarElements';
import logo from "../assets/logo.png"

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<img src={logo} alt="Logo" />
		<NavMenu>
		<NavLink to='/about' >
			O nama
		</NavLink>
		<NavLink to='/popis' >
			Popis
		</NavLink>
		<NavLink to='/donacije' >
			Donacije
		</NavLink>
		<NavLink to='/obavijesti' >
			Obavijesti
		</NavLink>
		{/*<NavLink to='/sign-up' >
			Sign Up
</NavLink>*/}
		{/* Second Nav */}
		{/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
		</NavMenu>
		{/*<NavBtn>
		<NavBtnLink to='/signin'>Sign In</NavBtnLink>
</NavBtn>*/}
	</Nav>
	</>
);
};

export default Navbar;
