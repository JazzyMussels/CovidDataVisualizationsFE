import React, {Component} from 'react'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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

      customTooltip = ({ active, payload, label }) => {
      
        return active && (
          <div className="custom-tooltip">
            <h1 className="label" style={{ color: 'black' }}>{label}</h1>
            <p className="label" style={{ color: 'black' }}>{`${payload[0]['name']} : ${payload[0].value}`}</p>
            <p className="label" style={{ color: 'black' }}>{`${payload[1]['name']} : ${payload[1].value}`}</p>
          </div>
        );
      
  
    };

      render(){
        return(
        <div className="App">
          <h1>Testing Results</h1>
          <div style={{backgroundColor: 'silver'}}>
          <ComposedChart
    layout="vertical"
    width={1300}
    height={1800}
  data={this.state.dataArray && this.state.dataArray}
    margin={{
      top: 20, right: 0, bottom: 20, left: 100,
    }}
  >
    <CartesianGrid stroke="black"  />
    <XAxis type="number" tick={{ fill: 'black', fontSize: 10 }} ticks={[0,1600,3200,4800,6400,8000,9600,11200,12800,14400,16000,17600,19200,20800,22400,24000,25600,27200,28800,30400,32000,33600,35200,36800,38400,40000]}/>
    <YAxis dataKey="name" type="category" tick={{ fill: 'black' }} />
    <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
    <Legend layout="horizontal" verticalAlign="top" align="center" />
    <Bar dataKey='total tests' barSize={90} fill="#413ea0" />
    <Line dataKey='positive tests' stroke="#ff7300" />
  </ComposedChart>
  </div>
        </div>
      );
        }
    }



    