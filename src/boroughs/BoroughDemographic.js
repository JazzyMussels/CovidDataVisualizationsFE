import React, {Component} from 'react'
import {LineChart, BarChart} from 'recharts';

export default class BoroughDemographic extends Component {

    // mode wil determine which category(cases, hospitilization, deaths) a user sees 
    state = {
        mode: 'cases',
        data: {}
    }

    //this data comes nested in a way that includes every borough in a given key, so
    //it is parsed out to include only that information which is relevant to the borough
    //selected by a user when this component renders
    componentDidMount() {
        fetch(`http://localhost:3001/${this.props.url}`)
            .then(resp => resp.json())
            .then(data => {
                let boroughData = {}
                for (const topKey in data) {
                    boroughData[topKey] = {}
                    for (const nestedKey in data[topKey]) {
                        if (nestedKey.startsWith(this.props.abbr)) {
                            boroughData[topKey][nestedKey] = data[topKey][nestedKey]
                        }
                    }
                }
                this.setState({data: boroughData})
            })
    }

    updateMode = (type) => {
        this.setState({mode: type})
    }

    render() {
        let [cat1,
            cat2,
            cat3,
            cat4,
            cat5] = [...this.props.categories]
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`

        return (
            <div>
                {/* parsing out the header */}
                <h1>
                    {this.props.borough === 'StatenIsland'
                        ? `Staten Island Results By ${this.props.demo}`
                        : this.props.borough + ` Results By ${this.props.demo}`}</h1>
                {/* This series of buttons determines which category is activated */}
                <button
                    className='category-btn'
                    id='cases'
                    onClick={e => this.updateMode(e.target.id)}>Cases</button>
                |
                <button
                    className='category-btn'
                    id='hospitilizations'
                    onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>
                |
                <button
                    className='category-btn'
                    id='deaths'
                    onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                <h2>Total {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h2>
                {/* Here each graph for the borough-specific demographic/category is conditionally rendered 
                    based on which mode is selected in state, and upon which demographic route has been 
                    chosen(age,sex,etc); Sex is a unique case as it the only category that does
                    not render a line chart to show cases */}
                {this.props.demo === 'Sex'
                    ? this.state.mode === 'cases' && this
                        .props
                        .chartInfo(BarChart, 'cases', this.state.data, caseCount, cat1, cat2, cat3, cat4, cat5, this.props.caseTicks())
                    : this.state.mode === 'cases' && this
                        .props
                        .chartInfo(LineChart, 'cases', this.state.data, caseCount, cat1, cat2, cat3, cat4, cat5, this.props.caseTicks())}
                {this.state.mode === 'deaths' && this
                    .props
                    .chartInfo(BarChart, 'deaths', this.state.data, deathCount, cat1, cat2, cat3, cat4, cat5, this.props.deathTicks())}
                {this.state.mode === 'hospitilizations' && this
                    .props
                    .chartInfo(BarChart, 'hospitilizations', this.state.data, hospitalizedCount, cat1, cat2, cat3, cat4, cat5, this.props.hospitalTicks())}
            </div>
        )
    }
}
