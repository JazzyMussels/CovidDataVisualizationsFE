import React, {Component} from 'react'
import BoroughRaceCharts from '../charts/BoroughRaceCharts'

export default class BoroughRace extends Component {
    state = {
        race_data : {}
    }

    componentDidMount(){
        fetch('http://localhost:3001/borough_race')
        .then(resp => resp.json())
        .then(data => this.setState({
            race_data: data
        }))
    }

    render(){
        return(
        <div>
            <BoroughRaceCharts></BoroughRaceCharts>
        </div>)
    }
}