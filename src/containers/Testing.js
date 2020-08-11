import React, {Component} from 'react'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class Testing extends Component {
  constructor(){
    super()
    this.state={
      dataArray: []
      }
      }
    
      componentDidMount(){
        fetch('http://localhost:3001/tests')
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
          'total tests': this.state[date]["TOTAL_TESTS"], 
          'positive tests': this.state[date]["POSITIVE_TESTS"] 
        }))
        this.setState({
          dataArray: dates
        })
      }

      render(){
        return(
        <div className="App">
          <h1>Testing Results</h1>
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
    <Bar dataKey='total tests' barSize={20} fill="#413ea0" />
    <Line dataKey='positive tests' stroke="#ff7300" />
  </ComposedChart>
        </div>
      );
        }
    }



    