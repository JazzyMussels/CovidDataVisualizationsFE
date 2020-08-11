import React, {Component} from 'react'
import BoroughMainBar from '../charts/BoroughMainBar'
import BoroughRace from '../boroughs/BoroughRace'
import BoroughSex from '../boroughs/BoroughSex'
import BoroughAge from '../boroughs/BoroughAge'

export default class EachBorough extends Component {

    state = {
        mode: 'all'
    }

    handleClick = (event) => {
        this.setState({
            mode: event.target.id
        })
        this.props.updateShowCategory()
    }

    render(){
        let borough = this.props.info.BOROUGH_GROUP
        console.log(this.state.mode)
        return(
            <div>
                {borough === 'Bronx' ? <h1>Data For The {borough} </h1> : null}
                {borough === 'StatenIsland' ? <h1>Data For Staten Island </h1> : null}
                {borough === 'Citywide' ? <h1>Data For All Boroughs </h1> : null}
                {borough === 'Brooklyn' || borough === 'Queens' || borough === 'Manhattan' ? <h1>Data For {borough} </h1> : null}
            <BoroughMainBar info={this.props.info}/>
            {this.state.mode === 'all' && 
            <div>
            <h2>Demographic Information</h2>
            <table onClick={(e) => this.handleClick(e)} width="100%" cellSpacing="10" cellPadding='20'>
                <tbody>
              <tr>
                <td width="25%"><img id='age' src={'/res_age.png'} alt='img'/></td>
                <td width="25%"><img id='sex' src={'/res_sex.png'} alt='img'/></td>
                <td width="25%"><img id='race' src={'/res_race.png'} alt='img'/></td>
              </tr>
              </tbody>
              </table>
            </div>
    }
            {this.state.mode === 'race' && <BoroughRace borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughRace>}
            {this.state.mode === 'sex' && <BoroughSex borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughSex>}
            {this.state.mode === 'age' && <BoroughAge borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughAge>}
            {this.props.showCategory ? <button id='all' onClick={(e) => this.handleClick(e)}>See all Categories</button> : <button onClick={this.props.returnClick}>See All Boroughs</button>}
            </div>
        )
    }
}