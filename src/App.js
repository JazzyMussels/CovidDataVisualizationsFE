import React, { Component} from 'react';
import './css/App.css';
import Borough from './boroughs/Borough'
import Neighborhoods from './components/Neighborhoods'
import Timeline from './components/Timeline'
import Testing from './components/Testing'
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header'
import About from './components/About'
import Citywide from './components/Citywide'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, LineChart} from 'recharts';
import Demographic from './containers/Demographic'

export default class App extends Component{

    customTooltip = ({ active, payload, label }) => {
      let items = []
      for(let i=0;i<payload.length;i++){
        items.push(<h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[i]['name']} : ${payload[i].value}`}</h2>)
      }
      return active && (
        <div className="custom-tooltip">
          <h2 className="label" style={{ color: '#E7E7E7' }}>{label}</h2>
          {[...items]}
        </div>
      );
  };

    colorLegend = (value, entry) => {
      const { color } = entry;
      return <span style={{ color }}>{value}</span>;
    }

    chartInfo = (ComponentType, mode, info, value_type, cat1, cat2, cat3, cat4, cat5, ticks=[]) => {
      let dataArray = []
      for(const cat of [cat1, cat2, cat3, cat4, cat5]){
        if (info[cat1] && cat !== undefined){
          dataArray.push({'name': cat, [mode]: info[cat][value_type], 'amt': info[cat][value_type]})
        }
      }
      return (
        <ComponentType
          width={1260}
          height={580}
          data={info[cat1] && dataArray}
          margin={{
            top: 5, right: 50, left: 130, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D'/>
          <XAxis  dataKey="name" stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20, width: 80}}/>
          <YAxis stroke='#99B898' tick={{ fill: '#99B898', fontSize: 20 }} ticks={ticks}/>
          <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip} />
          <Legend formatter={this.colorLegend}/>
          {ComponentType === LineChart ? <Line type="monotone" dataKey={mode} stroke="#F67280" strokeWidth='8' /> : <Bar dataKey={mode} fill="#F67280" />}
          
        </ComponentType>
      )
    }

    dualChartInfo = (MainComponentType, SubComponentType, width, height, info, mode1, mode2) => {
          return(
            <MainComponentType
            width={width}
            height={height}
            data={info}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='black' fill='#355C7D' />
                    <XAxis dataKey="name" stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                    <YAxis stroke='black' tick={{ fill: '#99B898', fontSize: 20 }}/>
                    <Tooltip cursor={{ stroke: '#EC2049', strokeWidth: 2, fill: '#6C5B7B' }} content={this.customTooltip}/>
                    <Legend formatter={this.colorLegend}/>
            <SubComponentType dataKey={mode1} fill="#F67280" />
            <SubComponentType dataKey={mode2} fill="#F8B195" />
          </MainComponentType>
          )
        }


  render(){   
    return(
     <div className='App'>
        <Header />
        <Switch>
        <Route exact path="/"><Redirect to="/home" /></Route>
        <Route path='/home' render={() => <Citywide dualChartInfo={this.dualChartInfo} />} />
        <Route path='/boroughs' render={() => <Borough dualChartInfo={this.dualChartInfo} chartInfo={this.chartInfo} />} />
        <Route path='/by_sex' render={() => <Demographic  demo={'Sex'} url={'sex_groups'} deathTicks={[...Array(12).keys() ].map( i => i*1000)} 
                                                          caseTicks={[]} hospitalTicks={[]} 
                                                          chartInfo={this.chartInfo} categories={["Male", "Female", undefined, undefined, undefined]}/>}
                                            />
        <Route path='/by_age' render={() => <Demographic  demo={'Age'} url={'age_groups'} deathTicks={[...Array(21).keys() ].map( i => i*500)} 
                                                          caseTicks={[]} hospitalTicks={[...Array(14).keys() ].map( i => i*1500)} 
                                                          chartInfo={this.chartInfo} categories={['0-17', '18-44', '45-64', '65-74', '75+']}/>}
                                            />
        <Route path='/by_income' render={() => <Demographic  demo={'Income'} url={'poverty_groups'} deathTicks={[]} 
                                                          caseTicks={[]} hospitalTicks={[...Array(21).keys() ].map( i => i*1100)} 
                                                          chartInfo={this.chartInfo} categories={["Low poverty", "Medium poverty", "High poverty", "Very high poverty", undefined]}/>}
                                            />
        <Route path='/by_race' render={() => <Demographic  demo={'Race'} url={'race_groups'} deathTicks={[]} 
                                                          caseTicks={[...Array(14).keys() ].map( i => i*3000)} hospitalTicks={[...Array(16).keys() ].map( i => i*1000)} 
                                                          chartInfo={this.chartInfo} categories={['Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White", undefined]}/>}
                                            />
        <Route path='/by_neighborhood' component={Neighborhoods}></Route>
        <Route path='/timeline' render={() => <Timeline customTooltip={this.customTooltip} colorLegend={this.colorLegend} />} />    
        <Route path='/about' component={About}></Route>
        <Route path='/testing' render={() => <Testing customTooltip={this.customTooltip} colorLegend={this.colorLegend} />} />
        </Switch>
        </div>   

  );
    }
}

