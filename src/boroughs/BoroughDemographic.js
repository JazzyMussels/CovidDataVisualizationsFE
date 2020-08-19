import React, {Component} from 'react'
import { LineChart, BarChart} from 'recharts';

export default class BoroughRace extends Component {
    state = {
        mode: 'cases',
        data: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3001/${this.props.url}`)
        .then(resp => resp.json())
        .then(data => {
            let boroughData = {}
            for(const topKey in data){
                boroughData[topKey] = {}
                for(const nestedKey in data[topKey]){     
                    if(nestedKey.startsWith(this.props.abbr)){
                        boroughData[topKey][nestedKey] = data[topKey][nestedKey]
                    }
                }
            }
            this.setState({
                data: boroughData
            })
        })
    }

    updateMode = (type) => {
        this.setState({
            mode: type
        })
    }

    render(){
        let [cat1, cat2, cat3, cat4, cat5] = [...this.props.categories]
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`

        return(
        <div>
            <h1> {this.props.borough === 'StatenIsland' ? 'Staten Island Results By Race' : this.props.borough + ` Results By ${this.props.demo}`}</h1>
            <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
            <h2>Total {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h2>
            {this.props.demo === 'Sex' ? 
                    this.state.mode === 'cases' && this.props.chartInfo(BarChart, 'cases', this.state.data, caseCount, cat1, cat2, cat3, cat4, cat5, this.props.caseTicks() ) 
                    : 
                    this.state.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.state.data, caseCount, cat1, cat2, cat3, cat4, cat5, this.props.caseTicks() )}
                {this.state.mode === 'deaths' && this.props.chartInfo(BarChart, 'deaths', this.state.data, deathCount, cat1, cat2, cat3, cat4, cat5, this.props.deathTicks())}
                {this.state.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.state.data, hospitalizedCount, cat1, cat2, cat3, cat4, cat5, this.props.hospitalTicks())}
        </div>)
    }
}
