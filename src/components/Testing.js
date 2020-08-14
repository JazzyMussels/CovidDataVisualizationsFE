import React, {Component} from 'react'
import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../css/testing.css';
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
          <div className="testing-custom-tooltip">
            <h3 className="testing-label" style={{ color: '#E7E7E7' }}>Date: {label}</h3>
            <h3 className="testing-label" style={{ color: '#E7E7E7' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h3>
            <h3 className="testing-label" style={{ color: '#E7E7E7' }}>{`${payload[1]['name']} : ${payload[1].value}`}</h3>
          </div>
        );
    };

    colorLegend = (value, entry) => {
      const { color } = entry;
      return <span style={{ color }}>{value}</span>;
    }

      render(){
        return(
        <div className="testing">
          <div id='testing-header'>
          <h1>Comparison of Total Tests With Positive Tests</h1>
          </div>
          <div id='testing-chart'>
          <ComposedChart
    layout="vertical"
    width={1400}
    height={1800}
  data={this.state.dataArray && this.state.dataArray}
    margin={{
      top: 20, right: 0, bottom: 20, left: 100,
    }}
  >
    <CartesianGrid stroke="black"  fill='#6C5B7B' />
    <XAxis type="number" tick={{ fill: '#99B898', fontSize: 20 }} ticks={[0,2000,4000,6000,8000,10000,12000,14000,16000,18000,20000,22000,24000,26000,28000,30000,32000,34000,36000]}/>
    <YAxis dataKey="name" type="category" tick={{ fill: '#99B898', fontSize: 20  }} />
    <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2 }} content={this.customTooltip}/>
    <Legend layout="horizontal" verticalAlign="top" align="center" formatter={this.colorLegend}/>
    <Bar dataKey='total tests' barSize={90} fill="#C06C84" />
    <Line dataKey='positive tests' stroke="#E84A5F" strokeWidth='8'/>
  </ComposedChart>
  </div>
        </div>
      );
        }
    }



    