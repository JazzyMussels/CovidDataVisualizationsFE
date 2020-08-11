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
        
          render(){
            let info = this.state.data
          
            return(    
                <div>
                 <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
               {this.state.mode === 'cases' && <LineChart
                width={700}
                height={700}
                data={info["Asian/Pacific-Islander"] && [
                    {
                    'name': "Asian/Pacific-Islander", 'cases': info["Asian/Pacific-Islander"]["CASE_COUNT"], 'amt': info["Asian/Pacific-Islander"]["CASE_COUNT"]
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
              </LineChart>
                }
                {this.state.mode === 'deaths' &&  <BarChart
            width={700}
            height={700}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian/Pacific-Islander", 'deaths': info["Asian/Pacific-Islander"]["DEATH_COUNT"], 'amt': info["Asian/Pacific-Islander"]["DEATH_COUNT"]
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="deaths" fill="#8884d8" />
          </BarChart>
                }
                {this.state.mode === 'hospitilizations' &&    <BarChart
            width={700}
            height={700}
            data={info["Asian/Pacific-Islander"] && [ 
                {
                'name': "Asian/Pacific-Islander", 'hospitilizations': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"], 'amt': info["Asian/Pacific-Islander"]["HOSPITALIZED_COUNT"]
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hospitilizations" fill="#8884d8" />
          </BarChart>
                }
                </div>
            )
        }
    }