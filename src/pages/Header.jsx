import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';

const Header = (props) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink><Link to="/cadastro">Cadastro Unico</Link></NavLink>
            </NavItem>
            <NavItem>
                <NavLink><Link to="/multiplo" >Cadastra Lista</Link></NavLink>
            </NavItem>
            <NavItem>
                <NavLink><Link to="/leitor" >Leitor</Link></NavLink>
            </NavItem>
        </Nav>
    )
}

export default Header;