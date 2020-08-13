import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/poverty.css';

export default class Poverty extends Component {
    constructor(){
        super()
        this.state={
            data: {},
            mode: 'cases'
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/poverty_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              data: data
            })
          })
          }
          updateMode = (id) => {
            this.setState({
              mode: id
            })
          }

          customTooltip = ({ active, payload, label }) => {
            return active && (
              <div className="poverty-custom-tooltip">
                <h1 className="poverty-label" style={{ color: '#A7226E' }}>{label}</h1>
                <h2 className="poverty-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
              </div>
            );
        };

        colorLegend = (value, entry) => {
          const { color } = entry;
          return <span style={{ color }}>{value}</span>;
        }
        
          render(){
            let info = this.state.data
          
            return(    
                <div id='poverty'>
                 <div id='poverty-header'>
                    <h2>Results By Income for All Boroughs</h2>
                  </div>
                  <div className='button-container'>
                  <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                  </div>
                  <div id='poverty-category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                    </div>
            {this.state.mode === 'cases' && <LineChart
                width={1260}
                height={560}
                data={info["Low poverty"] && [
                    {
                    'name': "Low Poverty", 'cases': info["Low poverty"]["CASE_COUNT"], 'amt': info["Low poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "Medium Poverty", 'cases': info["Medium poverty"]["CASE_COUNT"], 'amt': info["Medium poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "High Poverty", 'cases': info["High poverty"]["CASE_COUNT"], 'amt': info["High poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "Extreme Poverty", 'cases': info["Very high poverty"]["CASE_COUNT"], 'amt': info["Very high poverty"]["CASE_COUNT"]
                    }]     
                }
                margin={{
                  top: 5, right: 80, left: 170, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                <Legend formatter={this.colorLegend}/>
                <Line type="monotone" dataKey="cases" stroke="#F67280" strokeWidth='8'/>
              </LineChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={1260}
            height={560}
            data={info["Low poverty"] && [ 
                {
                'name': "Low Poverty", 'deaths': info["Low poverty"]["DEATH_COUNT"], 'amt': info["Low poverty"]["DEATH_COUNT"]
                },
                {
                'name': "Medium Poverty", 'deaths': info["Medium poverty"]["DEATH_COUNT"], 'amt': info["Medium poverty"]["DEATH_COUNT"]
                },
                {
                'name': "High Poverty", 'deaths': info["High poverty"]["DEATH_COUNT"], 'amt': info["High poverty"]["DEATH_COUNT"]
                },
                {
                'name': "Extreme Poverty", 'deaths': info["Very high poverty"]["DEATH_COUNT"], 'amt': info["Very high poverty"]["DEATH_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" fill='#355C7D'/>
            <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
            <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} />
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="deaths" fill="#F67280" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' &&    <BarChart
            width={1260}
            height={560}
            data={info["Low poverty"] && [ 
                {
                'name': "Low Poverty", 'hospitilizations': info["Low poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Low poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Medium Poverty", 'hospitilizations': info["Medium poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Medium poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "High Poverty", 'hospitilizations': info["High poverty"]["HOSPITALIZED_COUNT"], 'amt': info["High poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Extreme Poverty", 'hospitilizations': info["Very high poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Very high poverty"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' fill='#355C7D' strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20  }}/>
            <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20  }} ticks={ [0,1100,2200,3300,4400,5500,6600,7700,8800,9900,11000,12100,13200,14300,15400,16500,17600,18700,19800,20900,21000]}/>
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="hospitilizations" fill="#F67280" />
          </BarChart>
                }
                </div>
            )
        }
    }