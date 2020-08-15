import React, {Component} from 'react'
import BoroughMainBar from '../charts/BoroughMainBar'
import BoroughRace from './BoroughRace'
import BoroughSex from './BoroughSex'
import BoroughAge from './BoroughAge'
import '../css/each-borough.css'
export default class EachBorough extends Component {

    constructor(){
        super()
        
        this.state={
            mode: 'all'
        }
    }

    handleClick = (event) => {
        this.setState({
            mode: event.target.id
        })
        this.props.updateShowCategory()
    }

    handleReturn = () => {
        this.props.returnClick()
        this.props.scroll()
    }

    render(){
        let borough = this.props.info.BOROUGH_GROUP

        return(
            <div id='each-borough'>
                <h1>
                {borough === 'Bronx' && `Data For The ${borough}`}
                {borough === 'StatenIsland' && 'Data For Staten Island'}
                {(borough === 'Brooklyn' || borough === 'Queens' || borough === 'Manhattan') && `Data For ${borough}`}
                </h1>
            <BoroughMainBar info={this.props.info}/>
            {this.state.mode === 'all' && 
            <div id='category-div'>
            <h2>Select a Category</h2>
            <table onClick={(e) => this.handleClick(e)} width="100%" cellSpacing="10" cellPadding='20'>
                <tbody>
              <tr>
                <td width="25%"><img className='category-img' id='age' src={'/res_age.png'} alt='img'/></td>
                <td width="25%"><img className='category-img' id='sex' src={'/res_sex.png'} alt='img'/></td>
                <td width="25%"><img className='category-img' id='race' src={'/res_race.png'} alt='img'/></td>
              </tr>
              </tbody>
              </table>
            </div>
    }
            {this.state.mode === 'race' && <BoroughRace borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughRace>}
            {this.state.mode === 'sex' && <BoroughSex borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughSex>}
            {this.state.mode === 'age' && <BoroughAge borough={borough} abbr={this.props.abbr} mode={this.state.mode}></BoroughAge>}
            {this.props.showCategory ? <button id='all' className='return-btn' onClick={(e) => this.handleClick(e)}>See all Categories</button> : <button className='return-btn' onClick={this.handleReturn} >See All Boroughs</button>}
            </div>
        )
    }
}