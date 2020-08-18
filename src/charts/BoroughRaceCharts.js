import React, {Component} from 'react'
import { LineChart, BarChart} from 'recharts';


export default class BoroughRaceCharts extends Component {
 
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
      return []
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
      return []
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
              {this.props.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.props.info, caseCount, "Asian/Pacific-Islander", "Black/African-American", "Hispanic/Latino", "White", undefined, this.setCaseTicks())}
              {this.props.mode === 'deaths' && this.props.chartInfo(BarChart, 'deaths', this.props.info, deathCount, "Asian/Pacific-Islander", "Black/African-American", "Hispanic/Latino", "White", undefined, this.setDeathTicks())}
              {this.props.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.props.info, hospitalizedCount, "Asian/Pacific-Islander", "Black/African-American", "Hispanic/Latino", "White", undefined, this.setHospitalTicks())}
            </div>
        )
    }
}