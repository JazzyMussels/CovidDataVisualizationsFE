import React, {Component} from 'react'
import { BarChart, Bar} from 'recharts';
import '../css/borough-main.css';

export default class BoroughMainBar extends Component {

    render(){
        let info = this.props.info
        let casesHospitalData =[{name: 'Cases/Hospitilizations', 'cases': info.CASE_COUNT, 'hospitilizations': info.HOSPITALIZED_COUNT, 'amt': info.HOSPITALIZED_COUNT}]
        let casesDeathData =[{name: 'Cases/Deaths', 'cases': info.CASE_COUNT, 'deaths': info.DEATH_COUNT, 'amt': info.DEATH_COUNT}]

        return(
        <div id='borough-main'>
        <div id='leftheader'>
          <h3>Total Cases Compared to Hospitilizations</h3>
          </div>
          <div id='rightheader'><h3>Total Cases Compared to Deaths</h3>
          </div>
          <div id='hospital-cases'>
          {this.props.dualChartInfo(BarChart, Bar, 600, 400, casesHospitalData, 'cases', 'hospitilizations')}
      </div>
      <div id='death-cases'>
      {this.props.dualChartInfo(BarChart, Bar, 600, 400, casesDeathData, 'cases', 'deaths')}
      </div>
      </div>
        ) 
    }
}