import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
export default class BoroughRaceCharts extends Component {
    render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`
        let info = this.props.info

        return(    
            <div>
            {this.props.mode === 'cases' && <LineChart
            width={700}
            height={700}
            data={this.props.info['0-17'] && [
                {
                'name': '0-17', 'cases': info["0-17"][caseCount], 'amt': info["0-17"][caseCount]
                },
                {
                'name': '18-44', 'cases': info['18-44'][caseCount], 'amt': info['18-44'][caseCount]
                },
                {
                'name': '45-64', 'cases': info['45-64'][caseCount], 'amt': info['45-64'][caseCount]
                },
                {
                'name': '65-74', 'cases': info['65-74'][caseCount], 'amt': info['65-74'][caseCount]
                },
                {
                'name': '75+', 'cases': info['75+'][caseCount], 'amt': info['75+'][caseCount]
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
            {this.props.mode === 'deaths' &&  <BarChart
        width={700}
        height={700}
        data={this.props.info['0-17'] && [ 
            {
            'name': '0-17', 'deaths': info["0-17"][deathCount], 'amt': info["0-17"][deathCount]
            },
            {
            'name': '18-44', 'deaths': info['18-44'][deathCount], 'amt': info['18-44'][deathCount]
            },
            {
            'name': '45-64', 'deaths': info['45-64'][deathCount], 'amt': info['45-64'][deathCount]
            },
            {
            'name': '65-74', 'deaths': info['65-74'][deathCount], 'amt': info['65-74'][deathCount]
            },
            {
            'name': '75+', 'deaths': info['75+'][deathCount], 'amt': info['75+'][deathCount]
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
            {this.props.mode === 'hospitilizations' &&    <BarChart
        width={700}
        height={700}
        data={this.props.info['0-17'] && [ 
            {
            'name': '0-17', 'hospitilizations': info["0-17"][hospitalizedCount], 'amt': info["0-17"][hospitalizedCount]
            },
            {
            'name': '18-44', 'hospitilizations': info['18-44'][hospitalizedCount], 'amt': info['18-44'][hospitalizedCount]
            },
            {
            'name': '45-64', 'hospitilizations': info['45-64'][hospitalizedCount], 'amt': info['45-64'][hospitalizedCount]
            },
            {
            'name': '65-74', 'hospitilizations': info['65-74'][hospitalizedCount], 'amt': info['65-74'][hospitalizedCount]
            },
            {
            'name': '75+', 'hospitilizations': info['75+'][hospitalizedCount], 'amt': info['75+'][hospitalizedCount]
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