import React, {Component} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


export default class BoroughMainBar extends Component {
    render(){
        let info = this.props.info
        let casesHospitalData =[
            {
                name: 'Total Cases', 'cases': info.CASE_COUNT, 'hospitilizations': info.HOSPITALIZED_COUNT, 'amt': info.HOSPITALIZED_COUNT
            }
        ]
        let casesDeathData =[
            {
                name: 'Total Cases', 'cases': info.CASE_COUNT, 'deaths': info.DEATH_COUNT, 'amt': info.DEATH_COUNT
            }
        ]
        return(
        <div>
        <BarChart
        width={400}
        height={400}
        data={casesHospitalData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cases" fill="#8884d8" />
        <Bar dataKey="hospitilizations" fill="#82ca9d" />
      </BarChart>
      <BarChart
        width={400}
        height={400}
        data={casesDeathData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cases" fill="#8884d8" />
        <Bar dataKey="deaths" fill="#82ca9d" />
      </BarChart>
      </div>
        ) 
    }
}