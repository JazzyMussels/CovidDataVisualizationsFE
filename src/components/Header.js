import React, {Component} from 'react';
import { Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top" style={{'backgroundColor': '#363636'}}>
            <a href="/home" className="navbar-brand"><img className='logo' src={'/logo.png'} alt='img'/></a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                <div className="navbar-nav">
                    <Nav.Link href="/timeline">Timeline</Nav.Link>
                    <Nav.Link href="/testing">Testing</Nav.Link>
                    <Nav.Link href="/by_neighborhood">Neighborhoods</Nav.Link>
                    <NavDropdown className='sticky-top' title="Demographic Data" id="basic-nav-dropdown">
                     <NavDropdown.Item href="/boroughs">Borough</NavDropdown.Item>
                     <NavDropdown.Item href="/by_age">Age</NavDropdown.Item>
                     <NavDropdown.Item href="/by_income">Poverty</NavDropdown.Item>
                     <NavDropdown.Item href="/by_race">Race</NavDropdown.Item>
                     <NavDropdown.Item href="/by_sex">Sex</NavDropdown.Item>
                     <NavDropdown.Divider />
                     <NavDropdown.Item href='/home'>All Results</NavDropdown.Item>
                 </NavDropdown>
                </div>
                <div className="navbar-nav">
                     <Nav.Link className='sticky-top' href="/about">About</Nav.Link>
                </div>
            </div>
        </nav>
        )
    }
}