import React, {Component} from 'react'
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import '../css/testing.css';

export default class Testing extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/tests')
            .then(resp => resp.json())
            .then(data => {
                let dates = []
                Object
                    .keys(data)
                    .forEach(date => dates.push({'name': date, 'total tests': data[date]["TOTAL_TESTS"], 'positive tests': data[date]["POSITIVE_TESTS"]
                    }))
                this.setState({data: dates})
            })
    }

    render() {
        return (
            <div className="testing">
                <div id='testing-header'>
                    <h1>Comparison of Total Tests With Positive Tests</h1>
                </div>
                <div id='testing-chart'>
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
                        <CartesianGrid stroke="black" fill='#6C5B7B'/>
                        <XAxis
                            type="number"
                            tick={{
                            fill: '#99B898',
                            fontSize: 20
                        }}
                            ticks={[...Array(19).keys()].map(i => i * 2000)}/>
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
                        <Bar dataKey='total tests' barSize={90} fill="#C06C84"/>
                        <Line dataKey='positive tests' stroke="#E84A5F" strokeWidth='8'/>
                    </ComposedChart>
                </div>
            </div>
        );
    }
}
