import React, { Component} from 'react';
import './css/App.css';
import Poverty from './containers/Poverty'
import Age from './containers/Age'
import Borough from './boroughs/Borough'
import Neighborhoods from './components/Neighborhoods'
import Race from './containers/Race'
import Sex from './containers/Sex'
import Timeline from './components/Timeline'
import Testing from './components/Testing'
import {Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import About from './components/About'
import Contact from './components/Contact'
import Citywide from './components/Citywide'

export default class App extends Component{
 
  render(){
    return(
     <div className='App'>
        <Header />
        <Switch>
        <Route path="/" component={Citywide} exact />
        <Route path='/home' component={Citywide}></Route>
        <Route path='/boroughs' component={Borough}></Route>
        <Route path='/by_sex' component={Sex}></Route>
        <Route path='/by_age' component={Age}></Route>
        <Route path='/by_income' component={Poverty}></Route>
        <Route path='/by_neighborhood' component={Neighborhoods}></Route>
        <Route path='/timeline' component={Timeline}></Route>
        <Route path='/by_race' component={Race}></Route>
        <Route path='/about' component={About}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/testing' component={Testing}></Route>
        </Switch>
        </div>   

  );
    }
}

