import React, {Component} from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';

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
              <div className="custom-tooltip">
                <h1 className="label" style={{ color: 'black' }}>{label}</h1>
                <p className="label" style={{ color: 'black' }}>{`${payload[0]['name']} : ${payload[0].value}`}</p>
              </div>
            );
        };
        
          render(){
            let info = this.state.data
            
            return(    
                <div>
                <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                <br></br>
               {this.state.mode === 'cases' && <BarChart
            width={700}
            height={700}
            data={info["Male"] && [ 
                {
                'name': "Male", 'cases': info["Male"]["CASE_COUNT"], 'amt': info["Male"]["CASE_COUNT"]
                },
                {
                'name': "Female", 'cases': info["Female"]["CASE_COUNT"], 'amt': info["Female"]["CASE_COUNT"]
                }]
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='black' />
                <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
                <YAxis stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
                <Legend />
            <Bar dataKey="cases" fill="#8884d8" />
          </BarChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={700}
            height={700}
            data={info["Male"] && [ 
                {
                'name': "Male", 'deaths': info["Male"]["DEATH_COUNT"], 'amt': info["Male"]["DEATH_COUNT"]
                },
                {
                'name': "Female", 'deaths': info["Female"]["DEATH_COUNT"], 'amt': info["Female"]["DEATH_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }} ticks={[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000]}/>
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
            
            <Bar dataKey="deaths" fill="#8884d8" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' && <BarChart
            width={700}
            height={700}
            data={info["Male"] && [ 
                {
                'name': "Male", 'hospitilizations': info["Male"]["HOSPITALIZED_COUNT"], 'amt': info["Male"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Female", 'hospitilizations': info["Female"]["HOSPITALIZED_COUNT"], 'amt': info["Female"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' tick={{ fill: 'black', fontSize: 10 }} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black' }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }} />
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
            <Bar dataKey="hospitilizations" fill="#8884d8" />
          </BarChart>
                }
                </div>
            )
        }
    }