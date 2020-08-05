import React, {Component} from 'react'
import * as d3 from 'd3'

export default class Borough extends Component {
    constructor(){
        super()
        this.state={
            bronx: {},
            brooklyn: {},
            manhattan: {},
            queens: {},
            statenIsland: {}
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/boroughs')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              bronx: data["Bronx"],
              brooklyn: data['Brooklyn'],
              manhattan: data['Manhattan'],
              queens: data['Queens'],
              statenIsland: data['StatenIsland']
            })
          })
          }
        
          render(){
            let [bronx, brooklyn, nyc, queens, staten] = [this.state.bronx, this.state.brooklyn, this.state.manhattan, this.state.queens, this.state.statenIsland]
            return(
            <div className="App">
              <h1>Borough Groups</h1>
              <ol>
                  <li>Bronx: {bronx.CASE_COUNT}</li>
                  <li>Brooklyn: {brooklyn.CASE_COUNT}</li>
                  <li>manhattan: {nyc.CASE_COUNT}</li>
                  <li>Queens: {queens.CASE_COUNT}</li>
                  <li>Staten Island: {staten.CASE_COUNT}</li>
                  </ol>
            </div>
          );
            }
        }