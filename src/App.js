import React, {Fragment, Component} from 'react';
import './App.css';
// import * as d3 from 'd3'
import Poverty from './containers/Poverty'
import Age from './containers/Age'
import Borough from './containers/Borough'
import Neighborhoods from './containers/Neighborhoods'
import Race from './containers/Race'
import Sex from './containers/Sex'
import Timeline from './containers/Timeline'
import Testing from './containers/Testing'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import MyNav from './Header'

export default class App extends Component{
 
  render(){
    return(
     <div className='App'>
        <MyNav />
        </div>   

  );
    }




}

// <Poverty />
//       <Race />
//       <Age />
//       <Sex />
//       <Borough />
//       <Neighborhoods />
//       <Timeline />
//       <Testing />