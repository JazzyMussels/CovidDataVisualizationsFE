import React, {Component} from 'react'
import {BarChart} from 'recharts';



export default class BoroughSexCharts extends Component {
  

setHospitalTicks = () => {
  return this.props.abbr === 'QN_' ? [...Array(12).keys() ].map( i => i*1000) : []
}

  render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`
       
        return(    
            <div>
              <h2>Total {this.props.mode[0].toUpperCase() + this.props.mode.slice(1)}</h2>
              {this.props.mode === 'cases' && this.props.chartInfo(BarChart, 'cases', this.props.info, caseCount, "Male", "Female")}
              {this.props.mode === 'deaths' && this.props.chartInfo(BarChart, 'deaths', this.props.info, deathCount, "Male", "Female")}
              {this.props.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.props.info, hospitalizedCount, "Male", "Female", undefined, undefined, undefined, this.setHospitalTicks())}
            </div>
        )
    }
}