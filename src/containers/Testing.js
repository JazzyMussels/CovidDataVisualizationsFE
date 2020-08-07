import React, {Component} from 'react'
// import * as d3 from 'd3'

export default class Testing extends Component {
    constructor(){
        super()
        this.state={
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/tests')
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
              <h1>Positive Tests By Date</h1>
              <ol>
              {Object.keys(this.state).map(date => <li>{this.state[date]['DATE']}: {this.state[date].POSITIVE_TESTS}</li>)}
              </ol>
            </div>
          );
            }
        }