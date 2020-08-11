import React, {Component} from 'react'
import BoroughRaceCharts from '../charts/BoroughRaceCharts'

export default class BoroughRace extends Component {
    state = {
        data : {},
        mode: 'cases',
        borough: this.props.borough,
        currentData: {}
    }

    componentDidMount(){
        fetch('http://localhost:3001/borough_race')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
            data: data
        })
        this.parseData()
    }
    )
    }

    updateMode = (type) => {
        this.setState({
            mode: type
        })
    }

    parseData(){
    let obj = {}
    for(const topKey in this.state.data){
        obj[topKey] = {}
        for(const nestedKey in this.state.data[topKey]){     
            if(nestedKey.startsWith(this.props.abbr)){
                obj[topKey][nestedKey] = this.state.data[topKey][nestedKey]
            }
        }
    }
    this.setState({
        currentData: obj
    })
}



    render(){
        console.log(this.state.data["Asian/Pacific-Islander"] && this.state.data["Asian/Pacific-Islander"]['BK_CASE_COUNT'])
        return(
        <div>
            <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
            <BoroughRaceCharts currentMode={this.props.mode} info={this.state.currentData} mode={this.state.mode} abbr={this.props.abbr}></BoroughRaceCharts>
        </div>)
    }
}