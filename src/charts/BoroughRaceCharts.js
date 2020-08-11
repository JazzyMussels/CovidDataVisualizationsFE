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
            data={this.props.info["Asian/Pacific-Islander"] && [
                {
                'name': "Asian/Pacific-Islander", 'cases': info["Asian/Pacific-Islander"][caseCount], 'amt': info["Asian/Pacific-Islander"][caseCount]
                },
                {
                'name': "Black/African-American", 'cases': info["Black/African-American"][caseCount], 'amt': info["Black/African-American"][caseCount]
                },
                {
                'name': "Hispanic/Latino", 'cases': info["Hispanic/Latino"][caseCount], 'amt': info["Hispanic/Latino"][caseCount]
                },
                {
                'name': "White", 'cases': info["White"][caseCount], 'amt': info["White"][caseCount]
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
        data={this.props.info["Asian/Pacific-Islander"] && [ 
            {
            'name': "Asian/Pacific-Islander", 'deaths': info["Asian/Pacific-Islander"][deathCount], 'amt': info["Asian/Pacific-Islander"][deathCount]
            },
            {
            'name': "Black/African-American", 'deaths': info["Black/African-American"][deathCount], 'amt': info["Black/African-American"][deathCount]
            },
            {
            'name': "Hispanic/Latino", 'deaths': info["Hispanic/Latino"][deathCount], 'amt': info["Hispanic/Latino"][deathCount]
            },
            {
            'name': "White", 'deaths': info["White"][deathCount], 'amt': info["White"][deathCount]
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
        data={this.props.info["Asian/Pacific-Islander"] && [ 
            {
            'name': "Asian/Pacific-Islander", 'hospitilizations': info["Asian/Pacific-Islander"][hospitalizedCount], 'amt': info["Asian/Pacific-Islander"][hospitalizedCount]
            },
            {
            'name': "Black/African-American", 'hospitilizations': info["Black/African-American"][hospitalizedCount], 'amt': info["Black/African-American"][hospitalizedCount]
            },
            {
            'name': "Hispanic/Latino", 'hospitilizations': info["Hispanic/Latino"][hospitalizedCount], 'amt': info["Hispanic/Latino"][hospitalizedCount]
            },
            {
            'name': "White", 'hospitilizations': info["White"][hospitalizedCount], 'amt': info["White"][hospitalizedCount]
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