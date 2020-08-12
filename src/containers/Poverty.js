import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';


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
            {this.state.mode === 'cases' && <LineChart
                width={800}
                height={800}
                data={info["Low poverty"] && [
                    {
                    'name': "Low poverty", 'cases': info["Low poverty"]["CASE_COUNT"], 'amt': info["Low poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "Medium poverty", 'cases': info["Medium poverty"]["CASE_COUNT"], 'amt': info["Medium poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "High poverty", 'cases': info["High poverty"]["CASE_COUNT"], 'amt': info["High poverty"]["CASE_COUNT"]
                    },
                    {
                    'name': "Very high poverty", 'cases': info["Very high poverty"]["CASE_COUNT"], 'amt': info["Very high poverty"]["CASE_COUNT"]
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
                <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
              </LineChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={800}
            height={800}
            data={info["Low poverty"] && [ 
                {
                'name': "Low poverty", 'deaths': info["Low poverty"]["DEATH_COUNT"], 'amt': info["Low poverty"]["DEATH_COUNT"]
                },
                {
                'name': "Medium poverty", 'deaths': info["Medium poverty"]["DEATH_COUNT"], 'amt': info["Medium poverty"]["DEATH_COUNT"]
                },
                {
                'name': "High poverty", 'deaths': info["High poverty"]["DEATH_COUNT"], 'amt': info["High poverty"]["DEATH_COUNT"]
                },
                {
                'name': "Very high poverty", 'deaths': info["Very high poverty"]["DEATH_COUNT"], 'amt': info["Very high poverty"]["DEATH_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }} />
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
            <Bar dataKey="deaths" fill="#8884d8" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' &&    <BarChart
            width={800}
            height={800}
            data={info["Low poverty"] && [ 
                {
                'name': "Low poverty", 'hospitilizations': info["Low poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Low poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Medium poverty", 'hospitilizations': info["Medium poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Medium poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "High poverty", 'hospitilizations': info["High poverty"]["HOSPITALIZED_COUNT"], 'amt': info["High poverty"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Very high poverty", 'hospitilizations': info["Very high poverty"]["HOSPITALIZED_COUNT"], 'amt': info["Very high poverty"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' tick={{ fill: 'black', fontSize: 10 }} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black' }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }} ticks={ [0,1100,2200,3300,4400,5500,6600,7700,8800,9900,11000,12100,13200,14300,15400,16500,17600,18700,19800,20900,21000]}/>
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
            <Bar dataKey="hospitilizations" fill="#8884d8" />
          </BarChart>
                }
                </div>
            )
        }
    }