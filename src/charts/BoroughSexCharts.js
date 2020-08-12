import React, {Component} from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';

export default class BoroughSexCharts extends Component {
  customTooltip = ({ active, payload, label }) => {
    return active && (
      <div className="custom-tooltip">
        <h1 className="label" style={{ color: 'black' }}>Ages: {label}</h1>
        <p className="label" style={{ color: 'black' }}>{`${payload[0]['name']} : ${payload[0].value}`}</p>
      </div>
    );
}


setHospitalTicks = () => {
  return this.props.abbr === 'QN_' ? [...Array(12).keys() ].map( i => i*1000) : null
}

  render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`
        let info = this.props.info
        return(    
            <div>
            {this.props.mode === 'cases' && <BarChart
        width={700}
        height={700}
        data={this.props.info["Boroughwide"] && [ 
            {
            'name': "Male", 'cases': info["Male"][caseCount], 'amt': info["Male"][caseCount]
            },
            {
            'name': "Female", 'cases': info["Female"][caseCount], 'amt': info["Female"][caseCount]
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
            {this.props.mode === 'deaths' &&  <BarChart
        width={700}
        height={700}
        data={this.props.info["Male"] && [ 
            {
            'name': "Male", 'deaths': info["Male"][deathCount], 'amt': info["Male"][deathCount]
            },
            {
            'name': "Female", 'deaths': info["Female"][deathCount], 'amt': info["Female"][deathCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke="black" strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
            <YAxis stroke='black' tick={{ fill: 'black' }}/>
            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
            <Legend />
        <Bar dataKey="deaths" fill="#8884d8" />
      </BarChart>
            }
            {this.props.mode === 'hospitilizations' && <BarChart
        width={700}
        height={700}
        data={this.props.info["Male"] && [ 
            {
            'name': "Male", 'hospitilizations': info["Male"][hospitalizedCount], 'amt': info["Male"][hospitalizedCount]
            },
            {
            'name': "Female", 'hospitilizations': info["Female"][hospitalizedCount], 'amt': info["Female"][hospitalizedCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke='black' tick={{ fill: 'black', fontSize: 10 }} strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke='black' tick={{ fill: 'black' }}/>
        <YAxis stroke='black' tick={{ fill: 'black' }} ticks={this.setHospitalTicks()}/>
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
        <Legend />
        <Bar dataKey="hospitilizations" fill="#8884d8" />
      </BarChart>
            }
            </div>
        )
    }
}