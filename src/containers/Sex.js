import React, {Component} from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/sex.css';

export default class Race extends Component {
    constructor(){
        super()
        this.state={
            data: {},
            mode: 'cases'
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/sex_groups')
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
              <div className="sex-custom-tooltip">
                <h1 className="sex-label" style={{ color: '#A7226E' }}>{label}</h1>
                <h2 className="sex-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
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
                <div id='sex'>
                <div id='sex-header'>
                    <h2>Results By Sex for All Boroughs</h2>
                  </div>
                  <div className='button-container'>
                  <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                  </div>
                  <div id='age-category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                    </div>
               {this.state.mode === 'cases' && <BarChart
            width={1260}
            height={560}
            data={info["Male"] && [ 
                {
                'name': "Male", 'cases': info["Male"]["CASE_COUNT"], 'amt': info["Male"]["CASE_COUNT"]
                },
                {
                'name': "Female", 'cases': info["Female"]["CASE_COUNT"], 'amt': info["Female"]["CASE_COUNT"]
                }]
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip} />
                <Legend formatter={this.colorLegend}/>
            <Bar dataKey="cases" fill="#F67280"  />
          </BarChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={1260}
            height={560}
            data={info["Male"] && [ 
                {
                'name': "Male", 'deaths': info["Male"]["DEATH_COUNT"], 'amt': info["Male"]["DEATH_COUNT"]
                },
                {
                'name': "Female", 'deaths': info["Female"]["DEATH_COUNT"], 'amt': info["Female"]["DEATH_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" fill='#355C7D'/>
            <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
            <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]}/>
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="deaths" fill="#F67280"  />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' && <BarChart
            width={1260}
            height={560}
            data={info["Male"] && [ 
                {
                'name': "Male", 'hospitilizations': info["Male"]["HOSPITALIZED_COUNT"], 'amt': info["Male"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Female", 'hospitilizations': info["Female"]["HOSPITALIZED_COUNT"], 'amt': info["Female"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' fill='#355C7D' strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
            <YAxis stroke='#99B898' tick={{ fill: '#99B898' }} />
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="hospitilizations" fill="#F67280"  />
          </BarChart>
                }
                </div>
            )
        }
    }