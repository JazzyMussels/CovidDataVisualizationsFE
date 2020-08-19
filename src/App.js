import React from 'react';
import './css/App.css';
import Borough from './boroughs/Borough'
import Neighborhoods from './components/Neighborhoods'
import Timeline from './components/Timeline'
import Testing from './components/Testing'
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header'
import About from './components/About'
import Citywide from './components/Citywide'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    Line,
    LineChart
} from 'recharts';
import Demographic from './containers/Demographic'

export default function App() {

    // sets up a consistent style for the tool-tip hover description of each graph
    function customTooltip({active, payload, label}) {
        let items = []
        // the payload represents a collection of key/value pairs containing information to be included in each graph; for
        // each pair, we create a styled html element.
        for (let i = 0; i < payload.length; i++) {
            items.push(
                <h2
                    key={i}
                    className="label"
                    style={{
                    color: '#E7E7E7'
                }}>{`${payload[i]['name']} : ${payload[i].value}`}</h2>
            )
        }
        // if the user is actively hovering over the graph, update the tool-tip to include each item we pushed into the array from the payload
        return active && (
            <div className="custom-tooltip">
                <h2
                    className="label"
                    style={{
                    color: '#E7E7E7'
                }}>{label}</h2>
                {[...items]}
            </div>
        );
    };

    // matches the color of the data value in the legend to the color on the graph
    function colorLegend(value, color) {
        return <span style={{
            color
        }}>{value}</span>;
    }

    // sets up the structure of the single data-type chart that will be rendered;
    function chartInfo(ComponentType, mode, info, value_type, cat1, cat2, cat3, cat4, cat5, ticks = []) {
        let dataArray = []
        // for each category passed in, the data needs to have keys representing the name, 
        // the mode(whether it's cases, deaths, etc), and the amount to be rendered on the graph; It's
        //structured here so it interacts well with the recharts library
        for (const cat of[cat1,
            cat2,
            cat3,
            cat4,
            cat5]) {
            if (info[cat1] && cat !== undefined) {
                dataArray.push({'name': cat, [mode]: info[cat][value_type], 'amt': info[cat][value_type]
                })
            }
        }
        // the ComponentType will generally be either a LineChart or a BarChart, determined 
        // at the time of invocation; the formatting from the custom tool-tip and legend coloring functions
        // is also included here
        return (
            <ComponentType
                width={1260}
                height={580}
                data={info[cat1] && dataArray}
                margin={{
                top: 5,
                right: 50,
                left: 130,
                bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis
                    dataKey="name"
                    stroke='#99B898'
                    tick={{
                    fill: '#99B898',
                    fontSize: 20,
                    width: 80
                }}/>
                <YAxis
                    stroke='#99B898'
                    tick={{
                    fill: '#99B898',
                    fontSize: 20
                }}
                    ticks={ticks}/>
                <Tooltip
                    cursor={{
                    stroke: '#EC2049',
                    strokeWidth: 2,
                    fill: '#6C5B7B'
                }}
                    content={customTooltip}/>
                <Legend formatter={colorLegend}/> {ComponentType === LineChart
                    ? <Line type="monotone" dataKey={mode} stroke="#F67280" strokeWidth='8'/>
                    : <Bar dataKey={mode} fill="#F67280"/>}

            </ComponentType>
        )
    }

    // this is similar to the above function, but renders charts that handle two separate categories of 
    // information; the SubComponentType represents a Bar or a Line, depending on which typr of chart is used
    function dualChartInfo(MainComponentType, SubComponentType, width, height, info, mode1, mode2) {
        return (
            <MainComponentType
                width={width}
                height={height}
                data={info}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}>
                <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
                <XAxis
                    dataKey="name"
                    stroke='black'
                    tick={{
                    fill: '#99B898',
                    fontSize: 20
                }}/>
                <YAxis
                    stroke='black'
                    tick={{
                    fill: '#99B898',
                    fontSize: 20
                }}/>
                <Tooltip
                    cursor={{
                    stroke: '#EC2049',
                    strokeWidth: 2,
                    fill: '#6C5B7B'
                }}
                    content={customTooltip}/>
                <Legend formatter={colorLegend}/>
                <SubComponentType dataKey={mode1} fill="#F67280"/>
                <SubComponentType dataKey={mode2} fill="#F8B195"/>
            </MainComponentType>
        )
    }

    return (
        <div className='App'>
            <Header/>
            <Switch>
                <Route exact path="/"><Redirect to="/home"/></Route>
                <Route path='/home' render={() => <Citywide dualChartInfo={dualChartInfo}/>}/>
                <Route
                    path='/boroughs'
                    render={() => <Borough dualChartInfo={dualChartInfo} chartInfo={chartInfo}/>}/>
                <Route
                    path='/timeline'
                    render={() => <Timeline customTooltip={customTooltip} colorLegend={colorLegend}/>}/>
                <Route path='/about' component={About}></Route>
                <Route
                    path='/testing'
                    render={() => <Testing customTooltip={customTooltip} colorLegend={colorLegend}/>}/>

                    {/* The four subsequent routes render a re-useable component and have specific info
                        passed down related to the demographic category; each one has a unique url to fetch the appropriate data; 
                        the Tick props format the Y-axis values of each graph based on the scope of the data */}
                <Route
                    path='/by_sex'
                    render={() => <Demographic
                    demo={'Sex'}
                    url={'sex_groups'}
                    deathTicks={[...Array(12).keys()].map(i => i * 1000)}
                    caseTicks={[]}
                    hospitalTicks={[]}
                    chartInfo={chartInfo}
                    categories={["Male", "Female", undefined, undefined, undefined]}/>}/>
                <Route
                    path='/by_age'
                    render={() => <Demographic
                    demo={'Age'}
                    url={'age_groups'}
                    deathTicks={[...Array(21).keys()].map(i => i * 500)}
                    caseTicks={[]}
                    hospitalTicks={[...Array(14).keys()].map(i => i * 1500)}
                    chartInfo={chartInfo}
                    categories={['0-17', '18-44', '45-64', '65-74', '75+']}/>}/>
                <Route
                    path='/by_income'
                    render={() => <Demographic
                    demo={'Income'}
                    url={'poverty_groups'}
                    deathTicks={[]}
                    caseTicks={[]}
                    hospitalTicks={[...Array(21).keys()].map(i => i * 1100)}
                    chartInfo={chartInfo}
                    categories={["Low poverty", "Medium poverty", "High poverty", "Very high poverty", undefined]}/>}/>
                <Route
                    path='/by_race'
                    render={() => <Demographic
                    demo={'Race'}
                    url={'race_groups'}
                    deathTicks={[]}
                    caseTicks={[...Array(20).keys()].map(i => i * 2770)}
                    hospitalTicks={[...Array(18).keys()].map(i => i * 950)}
                    chartInfo={chartInfo}
                    categories={['Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White", undefined]}/>}/>
                <Route path='/by_neighborhood' component={Neighborhoods}></Route>
            </Switch>
        </div>

    );
}
