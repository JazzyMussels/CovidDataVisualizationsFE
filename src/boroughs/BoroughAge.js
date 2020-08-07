import React, {Component} from 'react'
import BoroughAgeCharts from '../charts/BoroughAgeCharts'

export default class BoroughAge extends Component {
    state = {
        data : {},
        mode: 'cases',
        borough: this.props.borough,
        currentData: {}
    }

    componentDidMount(){
        fetch('http://localhost:3001/borough_age')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
            data: data
        });
        this.parseData()
    }
        )
    }
    
    updateMode = (type) => {
        this.setState({
            mode: type
        })
    }

    parseData(){
    let obj = {}
    for(const topKey in this.state.data){
        obj[topKey] = {}
        for(const nestedKey in this.state.data[topKey]){     
            if(nestedKey.startsWith(this.props.abbr)){
                obj[topKey][nestedKey] = this.state.data[topKey][nestedKey]
            }
        }
    }
    this.setState({
        currentData: obj
    })
}

 

    render(){
        console.log(this.state.mode)
        return(
            <div>
                <h1> AGE DATA</h1>
                <button id='cases' onClick={e => this.updateMode(e.target.id)}>Cases</button> | <button id='hospitilizations' onClick={e => this.updateMode(e.target.id)}>Hospitilizations</button>  | <button id='deaths' onClick={e => this.updateMode(e.target.id)}>Deaths</button>
                <BoroughAgeCharts info={this.state.currentData} mode={this.state.mode} abbr={this.props.abbr}></BoroughAgeCharts>
            </div>
        )
    }
}