import React, {Component} from 'react'
// import * as d3 from 'd3'

export default class Race extends Component {
    constructor(){
        super()
        this.state={
            female: {},
            male: {}
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/sex_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              female: data["Female"],
              male: data["Male"]
            })
          })
          }
        
          render(){
            let [female, male] = [this.state.female, this.state.male]
            return(
            <div className="App">
              <h1>Sex Groups</h1>
              <ol>
                  <li>Female: {female.CASE_COUNT}</li>
                  <li>Male: {male.CASE_COUNT}</li>
                  </ol>
            </div>
          );
            }
        }