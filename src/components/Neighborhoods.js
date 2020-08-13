import React, {Component} from 'react'
// import * as d3 from 'd3'

// make a choropeth

export default class Neighborhood extends Component {
    constructor(){
        super()
        this.state={
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/neighborhoods')
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
            // console.log(Object.keys(this.state))
            return(
            <div className="App">
              <h1>Neighborhoods</h1>
              <ol>
              {Object.keys(this.state).map(zip => <li>{this.state[zip]['NEIGHBORHOOD_NAME']}: {this.state[zip]['COVID_CASE_COUNT']}</li>)}
              </ol>
            </div>
          );
            }
        }