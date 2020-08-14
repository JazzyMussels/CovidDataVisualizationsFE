import React, {Component} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../css/citywide.css';

export default class Citywide extends Component {

  constructor(){
    super()
    this.scrollRef = React.createRef();
    this.state={
      data: {},
      mode: 'cases'
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

    updateMode = id => {
        this.setState({
            mode: id
        })
    }

    customTooltip = ({ active, payload }) => {
      return active && (
        <div className="custom-tooltip">
          <h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
          <h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[1]['name']} : ${payload[1].value}`}</h2>
        </div>
      );
  };

  colorLegend = (value, entry) => {
  	const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  }

    render(){
        let info = this.state.data
        console.log(this.scrollRef)
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
        <BarChart
        width={580}
        height={580}
        data={casesHospitalData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
                <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                <Legend formatter={this.colorLegend}/>
        <Bar dataKey="cases" fill="#F67280" />
        <Bar dataKey="hospitilizations" fill="#F8B195" />
      </BarChart>
      </div>
      <div id='death-cases'>
      <BarChart
        width={580}
        height={580}
        data={casesDeathData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
                <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                <Legend formatter={this.colorLegend}/>
        <Bar dataKey="cases" fill="#F67280" />
        <Bar dataKey="deaths" fill="#F8B195" />
      </BarChart>
      </div>
      </div>
        ) 
    }
}