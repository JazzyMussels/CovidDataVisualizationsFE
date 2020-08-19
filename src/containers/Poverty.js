// import React, {Component} from 'react'
// import { LineChart, BarChart} from 'recharts';
// import '../css/poverty.css';

// export default class Poverty extends Component {
//     constructor(){
//         super()
//         this.state={
//             data: {},
//             mode: 'cases'
//           }
//           }
        
//           componentDidMount(){
//             fetch('http://localhost:3001/poverty_groups')
//             .then(resp => resp.json())
//             .then(data => {
//               this.setState({
//               data: data
//             })
//           })
//           }
//           updateMode = (id) => {
//             this.setState({
//               mode: id
//             })
//           }

//           render(){
//             let hospitalTicks = [...Array(21).keys() ].map( i => i*1100)
            
//             return(    
//                 <div id='poverty'>
//                  <div id='poverty-header'>
//                     <h2>Results By Income for All Boroughs</h2>
//                   </div>
//                   <div className='button-container'>
//                   <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
//                   </div>
//                   <div id='poverty-category-header'>
//                     <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
//                     </div>
//             {this.state.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.state.data, "CASE_COUNT", "Low poverty", "Medium poverty", "High poverty", "Very high poverty")}
//                 {this.state.mode === 'deaths' &&  this.props.chartInfo(BarChart, 'deaths', this.state.data, "DEATH_COUNT", "Low poverty", "Medium poverty", "High poverty", "Very high poverty")}
//                 {this.state.mode === 'hospitilizations' &&    this.props.chartInfo(BarChart, 'hospitilizations', this.state.data, "HOSPITALIZED_COUNT", "Low poverty", "Medium poverty", "High poverty", "Very high poverty", undefined, hospitalTicks)}
//                 </div>
//             )
//         }
//     }
