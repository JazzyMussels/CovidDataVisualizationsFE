import React, {Component} from 'react'
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import '../css/timeline.css';

export default class Timeline extends Component {

    state = {
        data: []
    }

    //The data is fetched and then parsed to make it play nicely with the recharts library structure; 
    //for the timeline we want to see cases, hospitilizations, and deaths in one composed chart
    componentDidMount() {
        fetch('https://yibuf5tkd1.execute-api.us-east-1.amazonaws.com/dev/timeline')
            .then(resp => resp.json())
            .then(data => {
                let dates = []
                Object.keys(data)
                    .forEach(date => dates.push({'name': date, 'cases': data[date]["CASE_COUNT"], 'hospitilizations': data[date]["HOSPITALIZED_COUNT"], 'deaths': data[date]["DEATH_COUNT"]
                    }))
                this.setState({data: dates})
            })
    }

    render() {
        return (
            <div className="timeline">
                <div id='timeline-header'>
                    <h1>Timeline of Cases, Hospitilizations, and Deaths</h1>
                </div>
                <div id='timeline-chart'>
                    <ComposedChart
                        layout="vertical"
                        width={1400}
                        height={1800}
                        data={this.state.data && this.state.data}
                        margin={{
                        top: 20,
                        right: 0,
                        bottom: 20,
                        left: 100
                    }}>
                        {/* The ticks below create the appropriate range for these specific x-axis
                            values; the custom tool-tip and legend formats are passed down from
                            the parent component; an area, bar, and line charts are combined to
                            show the different categories of data  */}
                        <CartesianGrid stroke="black" fill='#6C5B7B'/>
                        <XAxis
                            type="number"
                            tick={{
                            fill: '#99B898',
                            fontSize: 20
                        }}
                            ticks={[...Array(24).keys()].map(i => i * 75)}/>
                        <YAxis
                            dataKey="name"
                            type="category"
                            tick={{
                            fill: '#99B898',
                            fontSize: 20
                        }}/>
                        <Tooltip
                            cursor={{
                            stroke: '#EC2049',
                            strokeWidth: 2
                        }}
                            content={this.props.customTooltip}/>
                        <Legend
                            layout="horizontal"
                            verticalAlign="top"
                            align="center"
                            formatter={this.props.colorLegend}/>
                        <Area dataKey="cases" fill="#355C7D" stroke="#355C7D"/>
                        <Bar dataKey="hospitilizations" barSize={90} fill="#C06C84"/>
                        <Line dataKey="deaths" stroke="#E84A5F" strokeWidth='8'/>
                    </ComposedChart>
                </div>
            </div>
        );
    }
}
