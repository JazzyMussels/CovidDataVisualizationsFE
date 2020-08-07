import React, { Component} from 'react';
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
import {Route, Switch } from 'react-router-dom';
import Header from './Header'
import About from './containers/About'
import Contact from './containers/Contact'

export default class App extends Component{
 
  render(){
    return(
     <div className='App'>
        <Header />
        <h1 className='title'>NYC Covid-19 Data</h1>
        <Switch>
        <Route path='/home' component={Borough}></Route>
        <Route path='/by_sex' component={Sex}></Route>
        <Route path='/by_age' component={Age}></Route>
        <Route path='/by_income' component={Poverty}></Route>
        <Route path='/by_neighborhood' component={Neighborhoods}></Route>
        <Route path='/timeline' component={Timeline}></Route>
        <Route path='/by_race' component={Race}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/testing' component={Testing}></Route>
        {/* <Route path='/manhattan' component={Borough}></Route> */}
        </Switch>
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