import React, {Component} from 'react';
// import Poverty from './containers/Poverty'
// import Age from './containers/Age'
// import Borough from './containers/Borough'
// import Neighborhoods from './containers/Neighborhoods'
// import Race from './containers/Race'
// import Sex from './containers/Sex'
// import Timeline from './containers/Timeline'
// import Testing from './containers/Testing'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home"><img className='logo' src={'/logo.png'} alt='img'/></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="/timeline">Timeline</Nav.Link>
                <Nav.Link href="/testing">Testing</Nav.Link>
                <Nav.Link href="/by_neighborhood">Neighborhoods</Nav.Link>
                <NavDropdown title="Demographic Data" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/boroughs">Borough</NavDropdown.Item>
                    <NavDropdown.Item href="/by_age">Age</NavDropdown.Item>
                    <NavDropdown.Item href="/by_income">Poverty</NavDropdown.Item>
                    <NavDropdown.Item href="/by_race">Race</NavDropdown.Item>
                    <NavDropdown.Item href="/by_sex">Sex</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href='/home'>All Results</NavDropdown.Item>
                </NavDropdown>
                </Nav>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form> */}
            </Navbar>
        )
    }
}