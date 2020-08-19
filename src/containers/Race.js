// import React, {Component} from 'react'
// import { LineChart, BarChart} from 'recharts';
// import '../css/race.css';

// export default class Race extends Component {
//     constructor(){
//         super()
//         this.state={
//             data: {},
//             mode: 'cases'
//           }
//           }
        
//           componentDidMount(){
//             fetch('http://localhost:3001/race_groups')
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
//             let caseTicks = [...Array(14).keys() ].map( i => i*3000)
//             let hospitalTicks = [...Array(16).keys() ].map( i => i*1000)

//             return(    
//                 <div id='race'>
//                  <div id='race-header'>
//                     <h2>Results By Race for All Boroughs</h2>
//                   </div>
//                   <div className='button-container'>
//                   <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
//                   </div>
//                   <div id='race-category-header'>
//                     <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
//                     </div>
//                 {this.state.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.state.data, "CASE_COUNT", 'Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White", undefined, caseTicks)}
//                 {this.state.mode === 'deaths' &&  this.props.chartInfo(BarChart, 'deaths', this.state.data, "DEATH_COUNT", 'Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White")}
//                 {this.state.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.state.data, "HOSPITALIZED_COUNT", 'Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White", undefined, hospitalTicks)}
//                 </div>
//             )
//         }
//     }