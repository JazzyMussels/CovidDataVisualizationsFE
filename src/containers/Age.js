import React, {Component} from 'react'
import * as d3 from 'd3'

export default class Age extends Component {
   
    constructor(){
        super()
        this.state={
            under18: {},
            eighteenTo44: {},
            fortyFiveTo64: {},
            sixtyFiveTo64: {},
            over75: {}
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/age_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
                under18: data["0-17"],
                eighteenTo44: data["18-44"],
                fortyFiveTo64: data["45-64"],
                sixtyFiveTo64: data["65-74"],
                over75: data["75+"]
            })
          })
          }
        
          render(){
            let [genZ, millenials, genX, boomers, silent] = [this.state.under18, this.state.eighteenTo44, this.state.fortyFiveTo64, this.state.sixtyFiveTo64, this.state.over75]
            return(
            <div className="App">
              <h1>Age Groups</h1>
              <ol>
                  <li>-18: {genZ.CASE_COUNT}</li>
                  <li>18-44: {millenials.CASE_COUNT}</li>
                  <li>45-64: {genX.CASE_COUNT}</li>
                  <li>65-74: {boomers.CASE_COUNT}</li>
                  <li>75+: {silent.CASE_COUNT}</li>
                  </ol>
            </div>
          );
            }
        }