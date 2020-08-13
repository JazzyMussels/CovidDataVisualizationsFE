import React, {Component} from 'react'
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../css/timeline.css';
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
            console.log(dates)
            this.setState({
              date: dates
            })
          }


          customTooltip = ({ active, payload, label }) => {
      
              return active && (
                <div className="time-custom-tooltip">
                  <h2 className="time-label" style={{ color: '#A7226E' }}>Date: {label}</h2>
                  <h3 className="time-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h3>
                  <h3 className="time-label" style={{ color: '#A7226E' }}>{`${payload[1]['name']} : ${payload[1].value}`}</h3>
                  <h3 className="time-label" style={{ color: '#A7226E' }}>{`${payload[2]['name']} : ${payload[2].value}`}</h3>
                </div>
              );
          };

          colorLegend = (value, entry) => {
            const { color } = entry;
            return <span style={{ color }}>{value}</span>;
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
      data={this.state.date && this.state.date}
        margin={{
          top: 20, right: 0, bottom: 20, left: 100,
        }}
      >
        <CartesianGrid stroke="black" fill='#6C5B7B'/>
        <XAxis type="number" tick={{ fill: '#99B898', fontSize: 20 }} ticks={[0,75,150,225,300,375,450,525,600,675,750,825,900,975,1050,1125,1200,1275,1350,1425,1500,1575,1650,1725]}/>
        <YAxis dataKey="name" type="category" tick={{ fill: '#99B898', fontSize: 20 }} />
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2 }} content={this.customTooltip}/>
        <Legend layout="horizontal" verticalAlign="top" align="center" formatter={this.colorLegend}/>
        <Area dataKey="cases" fill="#355C7D" stroke="#355C7D" />
        <Bar dataKey="hospitilizations" barSize={90} fill="#C06C84" />
        <Line dataKey="deaths" stroke="#E84A5F" strokeWidth='8'/>
      </ComposedChart>
      </div>
            </div>
          );
            }
        }

 

        