// import React, {Component} from 'react'
// import BoroughRaceCharts from '../charts/BoroughRaceCharts'

// export default class BoroughRace extends Component {
//     state = {
//         data : {},
//         mode: 'cases',
//         currentData: {}
//     }

//     componentDidMount(){
//         fetch('http://localhost:3001/borough_race')
//         .then(resp => resp.json())
//         .then(data => {
//             this.setState({
//             data: data
//         })
//         this.parseData()
//     }
//     )
//     }

//     updateMode = (type) => {
//         this.setState({
//             mode: type
//         })
//     }

//     parseData(){
//     let obj = {}
//     for(const topKey in this.state.data){
//         obj[topKey] = {}
//         for(const nestedKey in this.state.data[topKey]){     
//             if(nestedKey.startsWith(this.props.abbr)){
//                 obj[topKey][nestedKey] = this.state.data[topKey][nestedKey]
//             }
//         }
//     }
//     this.setState({
//         currentData: obj
//     })
// }

//     render(){
//         console.log(this.state.data)
//         return(
//         <div>
//             <h1> {this.props.borough === 'StatenIsland' ? 'Staten Island Results By Race' : this.props.borough + ' Results By Race'}</h1>
//             <button className='category-btn' id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button className='category-btn' id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button className='category-btn' id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
//             <BoroughRaceCharts chartInfo={this.props.chartInfo} info={this.state.currentData}
//                                mode={this.state.mode} abbr={this.props.abbr}
//             />
//         </div>)
//     }
// }