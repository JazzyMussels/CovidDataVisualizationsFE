import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/race.css';

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
              <div className="race-custom-tooltip">
                <h1 className="race-label" style={{ color: '#A7226E' }}>{label}</h1>
                <h2 className="race-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
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
                <div id='race'>
                 <div id='race-header'>
                    <h2>Results By Race for All Boroughs</h2>
                  </div>
                  <div className='button-container'>
                  <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                  </div>
                  <div id='race-category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                    </div>
               {this.state.mode === 'cases' && <LineChart
                width={1260}
                height={560}
                data={info["Asian/Pacific-Islander"] && [
                    {
                    'name': "Asian", 'cases': info["Asian/Pacific-Islander"]["CASE_COUNT"], 'amt': info["Asian/Pacific-Islander"]["CASE_COUNT"]
                    },
                    {
                    'name': "Black", 'cases': info["Black/African-American"]["CASE_COUNT"], 'amt': info["Black/African-American"]["CASE_COUNT"]
                    },
                    {
                    'name': "Hispanic", 'cases': info["Hispanic/Latino"]["CASE_COUNT"], 'amt': info["Hispanic/Latino"]["CASE_COUNT"]
                    },
                    {
                    'name': "White", 'cases': info["White"]["CASE_COUNT"], 'amt': info["White"]["CASE_COUNT"]
                    }]     
                }
                margin={{
                  top: 5, right: 40, left: 150, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20}} ticks={[0,3000,6000,9000,12000,15000,18000,21000,24000,27000,30000,33000,36000,39000]}/>
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                <Legend formatter={this.colorLegend} />
                <Line type="monotone" dataKey="cases" stroke="#F67280" strokeWidth='8' />
              </LineChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={1260}
            height={560}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian", 'deaths': info["Asian/Pacific-Islander"]["DEATH_COUNT"], 'amt': info["Asian/Pacific-Islander"]["DEATH_COUNT"]
                },
                {
                'name': "Black", 'deaths': info["Black/African-American"]["DEATH_COUNT"], 'amt': info["Black/African-American"]["DEATH_COUNT"]
                },
                {
                'name': "Hispanic", 'deaths': info["Hispanic/Latino"]["DEATH_COUNT"], 'amt': info["Hispanic/Latino"]["DEATH_COUNT"]
                },
                {
                'name': "White", 'deaths': info["White"]["DEATH_COUNT"], 'amt': info["White"]["DEATH_COUNT"]
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
            <Legend formatter={this.colorLegend} />
            <Bar dataKey="deaths" fill="#F67280" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' &&    <BarChart
            width={1260}
            height={560}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian", 'hospitilizations': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"], 'amt': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Black", 'hospitilizations': info["Black/African-American"]["HOSPITALIZED_COUNT"], 'amt': info["Black/African-American"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "Hispanic", 'hospitilizations': info["Hispanic/Latino"]["HOSPITALIZED_COUNT"], 'amt': info["Hispanic/Latino"]["HOSPITALIZED_COUNT"]
                },
                {
                'name': "White", 'hospitilizations': info["White"]["HOSPITALIZED_COUNT"], 'amt': info["White"]["HOSPITALIZED_COUNT"]
                }] 
            }
            margin={{
              top: 5, right: 20, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid stroke='black' fill='#355C7D' strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
            <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} ticks={ [0,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000]}/>
            <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
            <Legend formatter={this.colorLegend} />
           
            <Bar dataKey="hospitilizations" fill="#F67280" />
          </BarChart>
                }
                </div>
            )
        }
    }