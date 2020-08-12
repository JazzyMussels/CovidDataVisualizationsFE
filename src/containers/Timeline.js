import React, {Component} from 'react'
import {ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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
                <div className="custom-tooltip">
                  <h1 className="label" style={{ color: 'black' }}>{label}</h1>
                  <p className="label" style={{ color: 'black' }}>{`${payload[0]['name']} : ${payload[0].value}`}</p>
                  <p className="label" style={{ color: 'black' }}>{`${payload[1]['name']} : ${payload[1].value}`}</p>
                  <p className="label" style={{ color: 'black' }}>{`${payload[2]['name']} : ${payload[2].value}`}</p>
                </div>
              );
            
        
          };

          render(){
            console.log(this.state.date)
            return(
            <div className="App" >
              <h1>Timeline</h1>
              <div style={{backgroundColor: 'silver'}}>
              <ComposedChart
        layout="vertical"
        width={1300}
        height={1800}
      data={this.state.date && this.state.date}
        margin={{
          top: 20, right: 0, bottom: 20, left: 100,
        }}
      >
        <CartesianGrid stroke="black" />
        <XAxis type="number" tick={{ fill: 'black', fontSize: 10 }} ticks={[0,75,150,225,300,375,450,525,600,675,750,825,900,975,1050,1125,1200,1275,1350,1425,1500,1575,1650,1725,1800]}/>
        <YAxis dataKey="name" type="category" tick={{ fill: 'black' }} />
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
        <Legend layout="horizontal" verticalAlign="top" align="center"/>
        <Area dataKey="cases" fill="#eb0c70" stroke="#eb0c70" />
        <Bar dataKey="hospitilizations" barSize={90} fill="#413ea0" />
        <Line dataKey="deaths" stroke="#ff7300" />
      </ComposedChart>
      </div>
            </div>
          );
            }
        }

 

        