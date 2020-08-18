import React, { Component} from 'react';
import './css/App.css';
import Poverty from './containers/Poverty'
import Age from './containers/Age'
import Borough from './boroughs/Borough'
import Neighborhoods from './components/Neighborhoods'
import Race from './containers/Race'
import Sex from './containers/Sex'
import Timeline from './components/Timeline'
import Testing from './components/Testing'
import {Route, Switch, Redirect} from 'react-router-dom';
import Header from './components/Header'
import About from './components/About'
import Citywide from './components/Citywide'
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, LineChart} from 'recharts';

export default class App extends Component{

    customTooltip = ({ active, payload, label }) => {
      return active && (
        <div className="custom-tooltip">
          <h2 className="label" style={{ color: '#E7E7E7' }}>{label}</h2>
          <h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[0]['name']} : ${payload[0].value}`}</h2>
          {payload[1] && <h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[1]['name']} : ${payload[1].value}`}</h2>}
          {payload[2] && <h2 className="label" style={{ color: '#E7E7E7' }}>{`${payload[2]['name']} : ${payload[2].value}`}</h2>}
        </div>
      );
  };

    colorLegend = (value, entry) => {
      const { color } = entry;
      return <span style={{ color }}>{value}</span>;
    }

    chartInfo = (ComponentType, mode, info, value_type, cat1, cat2, cat3, cat4, cat5=undefined, ticks=[]) => {
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
        <Route path='/by_sex' render={() => <Sex chartInfo={this.chartInfo} />}/>
        <Route path='/by_age' render={() => <Age chartInfo={this.chartInfo} />}/>
        <Route path='/by_income' render={() => <Poverty chartInfo={this.chartInfo} />}/>
        <Route path='/by_neighborhood' component={Neighborhoods}></Route>
        <Route path='/timeline' render={() => <Timeline customTooltip={this.customTooltip} colorLegend={this.colorLegend} />} />
        <Route path='/by_race' render={() => <Race chartInfo={this.chartInfo} />}/>
        <Route path='/about' component={About}></Route>
        <Route path='/testing' render={() => <Testing customTooltip={this.customTooltip} colorLegend={this.colorLegend} />} />
        </Switch>
        </div>   

  );
    }
}

