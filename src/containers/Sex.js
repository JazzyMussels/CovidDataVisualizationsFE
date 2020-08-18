import React, {Component} from 'react'
import {BarChart} from 'recharts';
import '../css/sex.css';

export default class Race extends Component {
    constructor(){
        super()
        this.state={
            data: {},
            mode: 'cases'
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/sex_groups')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              data: data
            })
          })
          }

          updateMode = (id) => {
            this.setState({
              mode: id
            })
          }
   
          render(){
            let deathTicks = [...Array(12).keys() ].map( i => i*1000)
            return(    
                <div id='sex'>
                  <div id='sex-header'>
                    <h2>Results By Sex for All Boroughs</h2>
                  </div>
                  <div >
                    <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                  </div>
                  <div id='age-category-header'>
                    <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
                  </div>
                  {this.state.mode === 'cases' && this.props.chartInfo(BarChart, 'cases', this.state.data, "CASE_COUNT", "Male", "Female")}
                  {this.state.mode === 'deaths' &&  this.props.chartInfo(BarChart, 'deaths', this.state.data, "DEATH_COUNT", "Male", "Female", undefined, undefined, undefined, deathTicks)}
                  {this.state.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.state.data, "HOSPITALIZED_COUNT", "Male", "Female")}     
                </div>
            )
        }
    }