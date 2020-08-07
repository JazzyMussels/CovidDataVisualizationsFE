import React, {Component} from 'react'
import BoroughSexCharts from '../charts/BoroughSexCharts'

export default class BoroughSex extends Component {
    state = {
        sex_data : {}
    }

    componentDidMount(){
        fetch('http://localhost:3001/borough_sex')
        .then(resp => resp.json())
        .then(data => this.setState({
            sex_data: data
        }))
    }

    render(){
        return(
            <div>
                <BoroughSexCharts></BoroughSexCharts>
            </div>
        )
    }
}