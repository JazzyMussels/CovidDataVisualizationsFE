import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';

export default class Race extends Component {
    constructor(){
        super()
        this.state={
            data: {},
            mode: 'cases'
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/race_groups')
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
                width={600}
                height={600}
                data={info["Asian/Pacific-Islander"] && [
                    {
                    'name': "Asian", 'cases': info["Asian/Pacific-Islander"]["CASE_COUNT"], 'amt': info["Asian/Pacific-Islander"]["CASE_COUNT"]
                    },
                    {
                    'name': "Black/African-American", 'cases': info["Black/African-American"]["CASE_COUNT"], 'amt': info["Black/African-American"]["CASE_COUNT"]
                    },
                    {
                    'name': "Hispanic/Latino", 'cases': info["Hispanic/Latino"]["CASE_COUNT"], 'amt': info["Hispanic/Latino"]["CASE_COUNT"]
                    },
                    {
                    'name': "White", 'cases': info["White"]["CASE_COUNT"], 'amt': info["White"]["CASE_COUNT"]
                    }]     
                }
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke='black' />
                <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
                <YAxis stroke='black' tick={{ fill: 'black', fontSize: 10}} ticks={[0,3000,6000,9000,12000,15000,18000,21000,24000,27000,30000,33000,36000,39000]}/>
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
              </LineChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={700}
            height={700}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian", 'deaths': info["Asian/Pacific-Islander"]["DEATH_COUNT"], 'amt': info["Asian/Pacific-Islander"]["DEATH_COUNT"]
                },
                {
                'name': "Black/African-American", 'deaths': info["Black/African-American"]["DEATH_COUNT"], 'amt': info["Black/African-American"]["DEATH_COUNT"]
                },
                {
                'name': "Hispanic/Latino", 'deaths': info["Hispanic/Latino"]["DEATH_COUNT"], 'amt': info["Hispanic/Latino"]["DEATH_COUNT"]
                },
                {
                'name': "White", 'deaths': info["White"]["DEATH_COUNT"], 'amt': info["White"]["DEATH_COUNT"]
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
            width={700}
            height={700}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian", 'hospitilizations': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"], 'amt': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Black/African-American", 'hospitilizations': info["Black/African-American"]["HOSPITALIZED_COUNT"], 'amt': info["Black/African-American"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Hispanic/Latino", 'hospitilizations': info["Hispanic/Latino"]["HOSPITALIZED_COUNT"], 'amt': info["Hispanic/Latino"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "White", 'hospitilizations': info["White"]["HOSPITALIZED_COUNT"], 'amt': info["White"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' tick={{ fill: 'black', fontSize: 10 }} strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }} ticks={ [0,
 1000,
 2000,
 3000,
 4000,
 5000,
 6000,
 7000,
 8000,
 9000,
 10000,
 11000,
 12000,
 13000,
 14000,
 15000]}/>
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
           
            <Bar dataKey="hospitilizations" fill="#8884d8" />
          </BarChart>
                }
                </div>
            )
        }
    }