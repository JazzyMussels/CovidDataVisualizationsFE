import React, {Component} from 'react'
// import * as d3 from 'd3'

// bar race

export default class Poverty extends Component {
    constructor(){
        super()
        this.state={
            low: {},
            medium: {},
            high: {},
            extreme: {}
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/poverty_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              low: data["Low poverty"],
              medium: data['Medium poverty'],
              high: data['High poverty'],
              extreme: data['Very high poverty']
            })
          })
          }
        
          render(){
            let [low, med, hi, ext] = [this.state.low, this.state.medium, this.state.high, this.state.extreme]
            return(
            <div className="App">
              <h1>Poverty Groups</h1>
              <ol>
                  <li>Low: {low.CASE_COUNT}</li>
                  <li>Medium: {med.CASE_COUNT}</li>
                  <li>High: {hi.CASE_COUNT}</li>
                  <li>Extreme: {ext.CASE_COUNT}</li>
                  </ol>
            </div>
          );
            }
        }