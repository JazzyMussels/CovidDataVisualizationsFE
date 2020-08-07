import React, {Component} from 'react'
import BoroughMainBar from '../charts/BoroughMainBar'
import BoroughRace from '../boroughs/BoroughRace'
import BoroughSex from '../boroughs/BoroughSex'
import BoroughAge from '../boroughs/BoroughAge'

export default class EachBorough extends Component {
    render(){
        let borough = this.props.info.BOROUGH_GROUP
        return(
            <div>
                {borough === 'Bronx' ? <h1>Data For The {borough} </h1> : null}
                {borough === 'StatenIsland' ? <h1>Data For Staten Island </h1> : null}
                {borough === 'Citywide' ? <h1>Data For All Boroughs </h1> : null}
                {borough === 'Brooklyn' || borough === 'Queens' || borough === 'Manhattan' ? <h1>Data For {borough} </h1> : null}
            <BoroughMainBar info={this.props.info}/>
            <h2>Demographic Information</h2>
            <BoroughRace borough={borough} abbr={this.props.abbr}></BoroughRace>
            <BoroughSex borough={borough} abbr={this.props.abbr}></BoroughSex>
            <BoroughAge borough={borough} abbr={this.props.abbr}></BoroughAge>
            </div>
        )
    }
}