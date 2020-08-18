import React, {Component} from 'react'
import { BarChart, Bar} from 'recharts';
import '../css/citywide.css';

export default class Citywide extends Component {

  constructor(){
    super()
    this.scrollRef = React.createRef();
    this.state={
      data: {}
    }
  }

  scrollToBottom = () => {
    this.scrollRef.current.scrollIntoView({ behavior: 'smooth' })
  }

    componentDidMount = () => {
        fetch('http://localhost:3001/boroughs')
        .then(res => res.json())
        .then(data => {
            this.setState({
                data: data['Citywide']
            })
        })
    }

    render(){
        let info = this.state.data
        let casesHospitalData =[{name: 'Cases/Hospitilizations', 'cases': info.CASE_COUNT, 'hospitilizations': info.HOSPITALIZED_COUNT, 'amt': info.HOSPITALIZED_COUNT}]
        let casesDeathData =[{name: 'Cases/Deaths', 'cases': info.CASE_COUNT, 'deaths': info.DEATH_COUNT, 'amt': info.DEATH_COUNT}]
        return(
        <div id='citywide'>
        <div>
        <img id='main-photo' src={'title.png'} alt='main'/>
        <img id='arrow-photo' onClick={this.scrollToBottom} src={'downfing.png'}onMouseOut={e => (e.currentTarget.src = "downfing.png")} onMouseOver={e => (e.currentTarget.src = "whitfing.png")}alt='main'/>
        </div>
        <div id='title-card' ref={this.scrollRef} >
        <h2>The Impact of Coronavirus Across All 5 Boroughs</h2>
        </div>
        <div id='leftheader'>
          <h3>Total Cases Compared to Hospitilizations</h3>
          </div>
          <div id='rightheader'><h3>Total Cases Compared to Deaths</h3>
          </div>
          <div id='hospital-cases'>
            {this.props.dualChartInfo(BarChart, Bar, 580, 580, casesHospitalData, 'cases', 'hospitilizations')}
      </div>
      <div id='death-cases'>
      {this.props.dualChartInfo(BarChart, Bar, 580, 580, casesDeathData, 'cases', 'deaths')}
      </div>
      </div>
        ) 
    }
}
