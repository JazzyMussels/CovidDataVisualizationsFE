import React, {Component} from 'react'
import { LineChart, BarChart} from 'recharts';


export default class BoroughAgeCharts extends Component {

    setCaseTicks = () => {
      switch (this.props.abbr){
        case 'BX_':
          return [...Array(20).keys() ].map( i => i*1000)
        case 'BK_':
          return [...Array(24).keys() ].map( i => i*1000)
        case 'MN_':
          return [...Array(12).keys() ].map( i => i*1000)
        case 'QN_':
          return [...Array(27).keys() ].map( i => i*1000)
        case 'SI_':
          return [...Array(7).keys() ].map( i => i*1000)
        default:
          return []
    }
  }

  setHospitalTicks = () => {
    return this.props.abbr === 'MN_' ? [...Array(10).keys() ].map( i => i*300) : []
}

  setDeathTicks = () => {
    switch (this.props.abbr){
      case 'BX_':
        return [...Array(10).keys() ].map( i => i*200)
      case 'BK_':
        return [...Array(10).keys() ].map( i => i*300)
      case 'MN_':
        return [...Array(9).keys() ].map( i => i*200)
      case 'QN_':
        return [...Array(10).keys() ].map( i => i*300)
      case 'SI_':
        return [...Array(6).keys() ].map( i => i*100)
      default:
        return []
  }
  }


    render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`

        return(    
            <div>
              <h2>Total {this.props.mode[0].toUpperCase() + this.props.mode.slice(1)}</h2>
              {this.props.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.props.info, caseCount, '0-17', '18-44', '45-64', '65-74', '75+', this.setCaseTicks())}
              {this.props.mode === 'deaths' && this.props.chartInfo(BarChart, 'deaths', this.props.info, deathCount, '0-17', '18-44', '45-64', '65-74', '75+', this.setDeathTicks())}
              {this.props.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.props.info, hospitalizedCount, '0-17', '18-44', '45-64', '65-74', '75+', this.setHospitalTicks())}
            </div>
        )
    }
}
