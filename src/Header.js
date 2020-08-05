import React, {Component} from 'react';
import Poverty from './containers/Poverty'
import Age from './containers/Age'
import Borough from './containers/Borough'
import Neighborhoods from './containers/Neighborhoods'
import Race from './containers/Race'
import Sex from './containers/Sex'
import Timeline from './containers/Timeline'
import Testing from './containers/Testing'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{
    render(){
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        )
    }
}