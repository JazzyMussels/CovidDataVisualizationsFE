import React, {Component} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../css/borough-main.css';

export default class BoroughMainBar extends Component {

  customTooltip = ({ active, payload }) => {
    return active && (
      <div className="b-main-custom-tooltip">
        <h2 className="b-main-label" style={{ color: '#E7E7E7' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
        <h2 className="b-main-label" style={{ color: '#E7E7E7' }}>{`${payload[1]['name']} : ${payload[1].value}`}</h2>
      </div>
    );
  }

  colorLegend = (value, entry) => {
  	const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  }

    render(){
        let info = this.props.info
    
        return(
        <div id='borough-main'>
        <div id='leftheader'>
          <h3>Total Cases Compared to Hospitilizations</h3>
          </div>
          <div id='rightheader'><h3>Total Cases Compared to Deaths</h3>
          </div>
          <div id='hospital-cases'>
        <BarChart
        width={600}
        height={400}
        data={[{name: 'Total Cases', 'cases': info.CASE_COUNT, 'amt': info.CASE_COUNT, 'hospitilizations': info.HOSPITALIZED_COUNT}]}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" stroke='black' fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend}/>
        <Bar dataKey="cases" fill="#F67280"/>
        <Bar dataKey="hospitilizations" fill="#F8B195"/>
      </BarChart>
      </div>
      <div id='death-cases'>
      <BarChart
        width={600}
        height={400}
        data={[{name: 'Total Cases', 'cases': info.CASE_COUNT, 'deaths': info.DEATH_COUNT, 'amt': info.CASE_COUNT}]}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
        <XAxis dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }}/>
        <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
        <Legend formatter={this.colorLegend}/>
        <Bar dataKey="cases" fill="#F67280" />
        <Bar dataKey="deaths" fill="#F8B195" />
      </BarChart>
      </div>
      </div>
        ) 
    }
}