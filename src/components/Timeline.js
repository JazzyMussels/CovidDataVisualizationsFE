import React, {Component} from 'react'
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../css/timeline.css';

export default class Timeline extends Component {
  
    constructor(){
        super()
        this.state={
          data: {},
          dateArray: []
          }
      }
        
          componentDidMount(){
            fetch('http://localhost:3001/timeline')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              data: data
            })
            this.parseData()
        })
          }

          parseData = () => {
            let dates = []
            Object.keys(this.state.data).forEach( date => dates.push(  {
              'name': date, 
              'cases': this.state.data[date]["CASE_COUNT"], 
              'hospitilizations': this.state.data[date]["HOSPITALIZED_COUNT"], 
              'deaths': this.state.data[date]["DEATH_COUNT"]
            }))
            this.setState({
              dateArray: dates
            })
          }

          render(){
            return(
            <div className="timeline" >
              <div id='timeline-header'>
              <h1>Timeline of Cases, Hospitilizations, and Deaths</h1>
              </div>
              <div id='timeline-chart'>
              <ComposedChart
        layout="vertical"
        width={1400}
        height={1800}
      data={this.state.dateArray && this.state.dateArray}
        margin={{
          top: 20, right: 0, bottom: 20, left: 100,
        }}
      >
        <CartesianGrid stroke="black" fill='#6C5B7B'/>
        <XAxis type="number" tick={{ fill: '#99B898', fontSize: 20 }} ticks={[...Array(24).keys() ].map( i => i*75)}/>
        <YAxis dataKey="name" type="category" tick={{ fill: '#99B898', fontSize: 20 }} />
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2 }} content={this.props.customTooltip}/>
        <Legend layout="horizontal" verticalAlign="top" align="center" formatter={this.props.colorLegend}/>
        <Area dataKey="cases" fill="#355C7D" stroke="#355C7D" />
        <Bar dataKey="hospitilizations" barSize={90} fill="#C06C84" />
        <Line dataKey="deaths" stroke="#E84A5F" strokeWidth='8'/>
      </ComposedChart>
      </div>
            </div>
          );
            }
        }

 

        