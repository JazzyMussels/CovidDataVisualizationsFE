import React, {Component} from 'react'
import * as d3 from 'd3'



export default class Timeline extends Component {
    constructor(){
        super()
        this.state={
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/timeline')
            .then(resp => resp.json())
            .then(data => {
                for (const key in data){
              this.setState({
              [key]: data[key],
            })
        }
          })
          }
        
          render(){
            // let [bronx, brooklyn, nyc, queens, staten] = [this.state.bronx, this.state.brooklyn, this.state.manhattan, this.state.queens, this.state.statenIsland]
            // console.log(Object.keys(this.state).map(date =>this.state[date].CASE_COUNT))
            return(
            <div className="App">
              <h1>Timeline</h1>
              <ol>
              {Object.keys(this.state).map(date => <li>{this.state[date]['DATE_OF_INTEREST']}: {this.state[date].CASE_COUNT}</li>)}
              </ol>
            </div>
          );
            }
        }