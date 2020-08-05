import React, {Component} from 'react'
import * as d3 from 'd3'

export default class Race extends Component {
    constructor(){
        super()
        this.state={
            asian: {},
            black: {},
            hispanic: {},
            white: {}
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/race_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              asian: data["Asian/Pacific-Islander"],
              black: data["Black/African-American"],
              hispanic: data["Hispanic/Latino"],
              white: data["White"]
            })
          })
          }
        
          render(){
            let [asian, black, hispanic, white] = [this.state.asian, this.state.black, this.state.hispanic, this.state.white]
            return(
            <div className="App">
              <h1>Race Groups</h1>
              <ol>
                  <li>Asian/Pacific Islander: {asian.CASE_COUNT}</li>
                  <li>Black/African-American: {black.CASE_COUNT}</li>
                  <li>Hispanic/Latino: {hispanic.CASE_COUNT}</li>
                  <li>White: {white.CASE_COUNT}</li>
                  </ol>
            </div>
          );
            }
        }