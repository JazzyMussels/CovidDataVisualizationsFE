import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/age.css';
export default class Age extends Component {
   
    constructor(){
        super()
        this.state={
            data: {},
            mode: 'cases'
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/age_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
                data: data
            })
          })
          }

          updateMode = (e) => {
            this.setState({
              mode: e
            })
          }

          customTooltip = ({ active, payload, label }) => {
            return active && (
              <div className="age-custom-tooltip">
                <h1 className="age-label" style={{ color: '#A7226E' }}>Ages: {label}</h1>
                <h2 className="age-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
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
                <div id='age'>
                  <div id='age-header'>
                    <h2>Results By Age for All Boroughs</h2>
                  </div>
                  <div className='button-container'>
                  <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                  </div>
                  <div id='age-category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                    </div>
                {this.state.mode === 'cases' && 
                
                <LineChart
                width={1260}
                height={560}
                data={info['0-17'] && [
                    {
                    'name': "0-17", 'cases': info["0-17"]["CASE_COUNT"], 'amt': info["0-17"]["CASE_COUNT"]
                    },
                    {
                    'name': '18-44', 'cases': info['18-44']["CASE_COUNT"], 'amt': info['18-44']["CASE_COUNT"]
                    },
                    {
                    'name': '45-64', 'cases': info['45-64']["CASE_COUNT"], 'amt': info['45-64']["CASE_COUNT"]
                    },
                    {
                    'name': '65-74', 'cases': info['65-74']["CASE_COUNT"], 'amt': info['65-74']["CASE_COUNT"]
                    },
                    {
                    'name': '75+', 'cases': info['75+']["CASE_COUNT"], 'amt': info['75+']["CASE_COUNT"]
                    }] 
                  
                }
                margin={{
                  top: 5, right: 20, left: 150, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis width='100' dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} />
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip} />
                <Legend formatter={this.colorLegend}/>
                <Line type="monotone" dataKey="cases" stroke="#F67280" strokeWidth='8' />
              </LineChart>
                }
     
                {this.state.mode === 'deaths' &&  <BarChart
            width={1260}
            height={560}
            data={info['0-17'] && [ 
                {
                'name': '0-17', 'deaths': info["0-17"]["DEATH_COUNT"], 'amt': info["0-17"]["DEATH_COUNT"]
                },
                {
                'name': '18-44', 'deaths': info['18-44']["DEATH_COUNT"], 'amt': info['18-44']["DEATH_COUNT"]
                },
                {
                'name': '45-64', 'deaths': info['45-64']["DEATH_COUNT"], 'amt': info['45-64']["DEATH_COUNT"]
                },
                {
                'name': '65-74', 'deaths': info['65-74']["DEATH_COUNT"], 'amt': info['65-74']["DEATH_COUNT"]
                },
                {
                'name': '75+', 'deaths': info['75+']["DEATH_COUNT"], 'amt': info['75+']["DEATH_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="black" fill='#355C7D' />
            <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20 }} />
            <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20 }} ticks={[0,500,1000,1500,2000,2500,3000,3500,4000,4500,5000,5500,6000,6500,7000,7500,8000,8500,9000,9500,10000]}/>
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="deaths" fill="#F67280" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' &&  <BarChart
            width={1260}
            height={560}
            data={info['0-17'] && [ 
                {
                'name': '0-17', 'hospitilizations': info["0-17"]["HOSPITALIZED_COUNT"], 'amt': info["0-17"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': '18-44', 'hospitilizations': info['18-44']["HOSPITALIZED_COUNT"], 'amt': info['18-44']["HOSPITALIZED_COUNT"]
                },
                {
                'name': '45-64', 'hospitilizations': info['45-64']["HOSPITALIZED_COUNT"], 'amt': info['45-64']["HOSPITALIZED_COUNT"]
                },
                {
                'name': '65-74', 'hospitilizations': info['65-74']["HOSPITALIZED_COUNT"], 'amt': info['65-74']["HOSPITALIZED_COUNT"]
                },
                {
                'name': '75+', 'hospitilizations': info['75+']["HOSPITALIZED_COUNT"], 'amt': info['75+']["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' fill= '#355C7D' strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
            <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20 }} ticks={[0,1500,3000,4500,6000,7500,9000,10500,12000,13500,15000,16500,18000,19500]}/>
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend}/>
            <Bar dataKey="hospitilizations" fill="#F67280" />
          </BarChart>
                }
                
                </div>
            )
        }
    }
