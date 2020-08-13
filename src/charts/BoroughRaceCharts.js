import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
import '../css/race-charts.css';

export default class BoroughRaceCharts extends Component {
 
  customTooltip = ({ active, payload, label }) => {
    return active && (
      <div className="race-charts-custom-tooltip">
        <h2 className="race-charts-label" style={{ color: '#A7226E' }}>Ages: {label}</h2>
        <h3 className="race-charts-label" style={{ color: '#A7226E' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h3 >
      </div>
    );
};

colorLegend = (value, entry) => {
  const { color } = entry;
  return <span style={{ color }}>{value}</span>;
}

setCaseTicks = () => {
  switch (this.props.abbr){
    case 'BX_':
      return [...Array(18).keys() ].map( i => i*1000)
    case 'BK_':
      return [...Array(13).keys() ].map( i => i*1000)
    case 'MN_':
      return [...Array(7).keys() ].map( i => i*1000)
    case 'QN_':
      return [...Array(13).keys() ].map( i => i*1000)
    case 'SI_':
      return [...Array(7).keys() ].map( i => i*1000)
    default:
      return null
}
}

setHospitalTicks = () => {
  switch (this.props.abbr){
    case 'BX_':
      return [...Array(7).keys() ].map( i => i*1000)
    case 'BK_':
      return [...Array(7).keys() ].map( i => i*1000)
    case 'MN_':
      return [...Array(14).keys() ].map( i => i*200)
    case 'QN_':
      return [...Array(7).keys() ].map( i => i*1000)
    case 'SI_':
      return [...Array(8).keys() ].map( i => i*200)
    default:
      return null
  }
}

setDeathTicks = () => {
switch (this.props.abbr){
  case 'BX_':
    return [...Array(11).keys() ].map( i => i*200)
  case 'BK_':
    return [...Array(12).keys() ].map( i => i*200)
  case 'MN_':
    return [...Array(11).keys() ].map( i => i*100)
  case 'QN_':
    return [...Array(10).keys() ].map( i => i*200)
  case 'SI_':
    return [...Array(7).keys() ].map( i => i*100)
  default:
    return null
}
}
    render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`
        let info = this.props.info
      
        return(    
            <div>
              <h2>Total {this.props.mode[0].toUpperCase() + this.props.mode.slice(1)}</h2>
            {this.props.mode === 'cases' && <LineChart
            width={1260}
            height={560}
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
              top: 5, right: 30, left: 150, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
                <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} ticks={this.setCaseTicks()} />
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                <Legend formatter={this.colorLegend} />
            <Line type="monotone" dataKey="cases" stroke="#F67280" strokeWidth='8' />
          </LineChart>
            }
            {this.props.mode === 'deaths' &&  <BarChart
        width={1260}
        height={560}
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
          top: 5, right: 30, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"  stroke="black" fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898' }}ticks={this.setDeathTicks()}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend} />
        <Bar dataKey="deaths" fill="#F67280" />
      </BarChart>
            }
            {this.props.mode === 'hospitilizations' &&    <BarChart
        width={1260}
        height={560}
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
          top: 5, right: 30, left: 150, bottom: 5,
        }}
      >
        <CartesianGrid stroke='black'  strokeDasharray="3 3" fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} ticks={this.setHospitalTicks()}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend}/>
        <Bar dataKey="hospitilizations" fill="#F67280" />
      </BarChart>
            }
            </div>
        )
    }
}