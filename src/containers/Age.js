import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';

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

          render(){
            let info = this.state.data
            console.log(this.state.mode)
            return(    
                <div>
                  <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                {this.state.mode === 'cases' && <LineChart
                width={700}
                height={700}
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
                {this.state.mode === 'hospitilizations' &&  <BarChart
            width={700}
            height={700}
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
        
        //   render(){
        //     let [genZ, millenials, genX, boomers, silent] = [this.state.under18, this.state.eighteenTo44, this.state.fortyFiveTo64, this.state.sixtyFiveTo64, this.state.over75]
        //     return(
        //     <div className="App">
        //       <h1>Age Groups</h1>
        //       <ol>
        //           <li>-18: {genZ.CASE_COUNT}</li>
        //           <li>18-44: {millenials.CASE_COUNT}</li>
        //           <li>45-64: {genX.CASE_COUNT}</li>
        //           <li>65-74: {boomers.CASE_COUNT}</li>
        //           <li>75+: {silent.CASE_COUNT}</li>
        //           </ol>
        //     </div>
        //   );
        //     }
        // }