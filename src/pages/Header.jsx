import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink, NavbarBrand, Button } from 'reactstrap';
import './Header.css'

const Header = (props) => {
    const printPage = () => {
        window.print();
    }
    return (
        <Navbar style={{ color: '#fff', backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-around'}}>
        <NavbarBrand tag={Link} to="/leitor">GERESTOC</NavbarBrand>
        {props.isLogged?
        <React.Fragment>
        <Nav className="my-links" >
            <NavItem>
                <NavLink activeStyle={{fontWeight: "bold"}} tag={Link} to="/cadastro">Cadastro Unico</NavLink>
            </NavItem>
            <NavItem>
                <NavLink activeStyle={{fontWeight: "bold" }} tag={Link} to="/multiplo" >Cadastra Lista</NavLink>
            </NavItem>
            <NavItem>
                <NavLink activeStyle={{fontWeight: "bold" }} tag={Link} to="/leitor" >Leitor</NavLink>
            </NavItem>
            <NavItem>           
             <Button onClick={printPage}>Imprimir</Button>
            </NavItem>           
        </Nav>
        <Nav  >
        <NavItem>
                <NavLink onClick={props.logout} >Logout</NavLink>
            </NavItem>
        </Nav>
        </React.Fragment>
        :
        <div>

        </div>
    }
        </Navbar>
    )
}

export default Header;