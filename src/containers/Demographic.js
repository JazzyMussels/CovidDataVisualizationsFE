import React, {Component} from 'react'
import {LineChart, BarChart} from 'recharts';
import '../css/demographic.css';

export default class Demographic extends Component {

    //the mode in state will determine which category is shown(deaths, hospitilizations, or cases)
    state = {
        data: {},
        mode: 'cases'
    }

    // Here we grab the correct data according to the url prop passed in and pass the data response into state
    
    componentDidMount() {
        this.props.url && fetch(`https://yibuf5tkd1.execute-api.us-east-1.amazonaws.com/dev/${this.props.url}`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({data: data})
            })
    }

    updateMode = (id) => {
        this.setState({mode: id})
    }

    render() {
        let [cat1,
            cat2,
            cat3,
            cat4,
            cat5] = [...this.props.categories]

        return (
            <div id='demographic'>
                <div id='header'>
                    <h2>Results By {this.props.demo} For All Boroughs</h2>
                </div>
                <div className='button-container'>
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
                </div>

                <div id='category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                </div>
                {/* Here each graph for borough-wide demographic categories is conditionally rendered 
                    based on which mode is selected in state, and upon which demographic route has been 
                    chosen(age,sex,etc); Sex is a unique case as it the only category that does
                    not render a line chart to show cases */}
                {this.props.demo === 'Sex'
                    ? this.state.mode === 'cases' && this
                        .props
                        .chartInfo(BarChart, 'cases', this.state.data, "CASE_COUNT", cat1, cat2, cat3, cat4, cat5, this.props.caseTicks)
                    : this.state.mode === 'cases' && this
                        .props
                        .chartInfo(LineChart, 'cases', this.state.data, "CASE_COUNT", cat1, cat2, cat3, cat4, cat5, this.props.caseTicks)}
                {this.state.mode === 'deaths' && this
                    .props
                    .chartInfo(BarChart, 'deaths', this.state.data, "DEATH_COUNT", cat1, cat2, cat3, cat4, cat5, this.props.deathTicks)}
                {this.state.mode === 'hospitilizations' && this
                    .props
                    .chartInfo(BarChart, 'hospitilizations', this.state.data, "HOSPITALIZED_COUNT", cat1, cat2, cat3, cat4, cat5, this.props.hospitalTicks)}
            </div>
        )
    }
}
