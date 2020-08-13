import React, {Component} from 'react'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/sex-charts.css';


export default class BoroughSexCharts extends Component {
  customTooltip = ({ active, payload, label }) => {
    return active && (
      <div className="sex-charts-custom-tooltip">
        <h2 className="sex-charts-label" style={{ color: '#A7226E' }}>Ages: {label}</h2>
        <h3 className="sex-charts-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h3>
      </div>
    );
}

colorLegend = (value, entry) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
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
              <h2>Total {this.props.mode[0].toUpperCase() + this.props.mode.slice(1)}</h2>
            {this.props.mode === 'cases' && <BarChart
        width={1260}
        height={560}
        data={this.props.info["Boroughwide"] && [ 
            {
            'name': "Male", 'cases': info["Male"][caseCount], 'amt': info["Male"][caseCount]
            },
            {
            'name': "Female", 'cases': info["Female"][caseCount], 'amt': info["Female"][caseCount]
            }]
        }
        margin={{
          top: 5, right: 30, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend} />
        <Bar dataKey="cases" fill="#F67280" />
      </BarChart>
            }
            {this.props.mode === 'deaths' &&  <BarChart
        width={1260}
        height={560}
        data={this.props.info["Male"] && [ 
            {
            'name': "Male", 'deaths': info["Male"][deathCount], 'amt': info["Male"][deathCount]
            },
            {
            'name': "Female", 'deaths': info["Female"][deathCount], 'amt': info["Female"][deathCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"  stroke="black" fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898' }}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend} />
        <Bar dataKey="deaths" fill="#F67280" />
      </BarChart>
            }
            {this.props.mode === 'hospitilizations' && <BarChart
        width={1260}
        height={560}
        data={this.props.info["Male"] && [ 
            {
            'name': "Male", 'hospitilizations': info["Male"][hospitalizedCount], 'amt': info["Male"][hospitalizedCount]
            },
            {
            'name': "Female", 'hospitilizations': info["Female"][hospitalizedCount], 'amt': info["Female"][hospitalizedCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid stroke='black'  strokeDasharray="3 3" fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend}/>
        <Bar dataKey="hospitilizations" fill="#F67280" />
      </BarChart>
            }
            </div>
        )
    }
}