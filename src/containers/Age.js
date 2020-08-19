// import React, {Component} from 'react'
// import { LineChart, BarChart} from 'recharts';
// import '../css/age.css';
// export default class Age extends Component {
   
//     constructor(){
//         super()
//         this.state={
//             data: {},
//             mode: 'cases'
//           }
//           }
        
//           componentDidMount(){
//             fetch('http://localhost:3001/age_groups')
//             .then(resp => resp.json())
//             .then(data => {
//               this.setState({
//                 data: data
//             })
//           })
//           }

//           updateMode = (id) => {
//             this.setState({
//               mode: id
//             })
//           }

//           render(){
//             let deathTicks= [...Array(21).keys() ].map( i => i*500)
//             let hospitalTicks = [...Array(14).keys() ].map( i => i*1500)
//             return(    
//                 <div id='age'>
//                   <div id='age-header'>
//                     <h2>Results By Age for All Boroughs</h2>
//                   </div>
//                   <div className='button-container'>
//                   <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
//                   </div>
//                   <div id='age-category-header'>
//                     <h3>Number of {this.state.mode[0].toUpperCase() + this.state.mode.slice(1)}</h3>
//                     </div>
//                     {/* {this.props.demo === 'Sex' ? } */}
//                 {this.state.mode === 'cases' && this.props.chartInfo(LineChart, 'cases', this.state.data, "CASE_COUNT", '0-17', '18-44', '45-64', '65-74', '75+')}
//                 {this.state.mode === 'deaths' && this.props.chartInfo(BarChart, 'deaths', this.state.data, "DEATH_COUNT", '0-17', '18-44', '45-64', '65-74', '75+', deathTicks)}
//                 {this.state.mode === 'hospitilizations' && this.props.chartInfo(BarChart, 'hospitilizations', this.state.data, "HOSPITALIZED_COUNT", '0-17', '18-44', '45-64', '65-74', '75+', hospitalTicks)}
//         </div>
//             )
//         }
//     }
