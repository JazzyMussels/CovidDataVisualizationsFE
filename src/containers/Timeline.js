import React, {Component} from 'react'
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Timeline extends Component {
    constructor(){
        super()
        this.state={
          dataArray: []
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/timeline')
            .then(resp => resp.json())
            .then(data => {
                for (const key in data){
              this.setState({
              [key]: data[key]
            })
        }
          this.parseData()
          })
          }

          parseData = () => {
            let dates = []
            Object.keys(this.state).forEach( date => dates.push(  {
              'name': date, 
              'cases': this.state[date]["CASE_COUNT"], 
              'hospitilizations': this.state[date]["HOSPITALIZED_COUNT"], 
              'deaths': this.state[date]["DEATH_COUNT"]
            }))
            this.setState({
              dataArray: dates
            })
          }

          render(){
            return(
            <div className="App">
              <h1>Timeline</h1>
              <ComposedChart
        layout="vertical"
        width={1500}
        height={1500}
      data={this.state.dataArray && this.state.dataArray}
        margin={{
          top: 20, right: 20, bottom: 20, left: 70,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Area dataKey="cases" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="hospitilizations" barSize={20} fill="#413ea0" />
        <Line dataKey="deaths" stroke="#ff7300" />
      </ComposedChart>
            </div>
          );
            }
        }

 

        