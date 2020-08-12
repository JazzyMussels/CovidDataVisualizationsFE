import React, {Component} from 'react'
import EachBorough from '../components/EachBorough'
import {Link} from 'react-router-dom';

export default class Borough extends Component {
    constructor(){
        super()
        this.state={
            bronx: {},
            brooklyn: {},
            manhattan: {},
            queens: {},
            statenIsland: {},
            citywide: {},
            showBorough: false,
            currentChoice: '',
            showCategory: false
          }
          }
          
      
          componentDidMount(){
            fetch('http://localhost:3001/boroughs')
            .then(resp => resp.json())
            .then(data => {
              this.setState({
              bronx: data["Bronx"],
              brooklyn: data['Brooklyn'],
              manhattan: data['Manhattan'],
              queens: data['Queens'],
              statenIsland: data['StatenIsland'],
              citywide: data['Citywide']
            }) 

          })
        }

        iterateState = (id) => {
          let dict = {'Bronx': this.state.bronx, 'Brooklyn': this.state.brooklyn, 
                      'Manhattan': this.state.manhattan, 'Queens': this.state.queens, 
                      'StatenIsland': this.state.statenIsland, 'Citywide': this.state.citywide}
          let abbrDict = {'Bronx': 'BX_', 'Brooklyn': 'BK_', 'Manhattan': 'MN_', 'Queens': 'QN_', 'StatenIsland': 'SI_'}
            return(
              <div>
                <EachBorough key={id} info={dict[id]} abbr={abbrDict[id]} showCategory={this.state.showCategory} updateShowCategory={this.updateShowCategory} returnClick={this.returnClick}/>
              </div>
            )
          
        }

        updateShowCategory = () => {
          this.setState({
            showCategory: !this.state.showCategory
          })
        }

        returnClick = () => {
          this.setState({
            showBorough: !this.state.showBorough,
            currentChoice: ''
          })
        }
        
        handleClick = (event) => {
          this.setState({
            showBorough: !this.state.showBorough,
            currentChoice: event.target.id,
          })
          this.iterateState(event.target.id)
        }
          render(){
          return(
           <div>
              {this.state.showBorough ?
               this.iterateState(this.state.currentChoice) :
              <div>
              <h1>Select A Borough</h1>
              <table  width="100%" cellSpacing="10" cellPadding='20'>
                <tbody>
              <tr>
                <td width="25%"><img onClick={(e) => this.handleClick(e)} id='Bronx' src={'/bronx.jpg'} alt='img'/></td>
                <td width="25%"><img onClick={(e) => this.handleClick(e)} id='Brooklyn' src={'/brooklyn.jpg'} alt='img'/></td>
              </tr>
              <tr>
                <td width="25%"><img onClick={(e) => this.handleClick(e)} id='Manhattan' src={'/nyc.jpg'} alt='img'/></td>
                <td width="25%"><img onClick={(e) => this.handleClick(e)} id='Queens' src={'/queens.jpg'} alt='img'/></td>
              </tr>
              <tr>
                <td width="25%"><img onClick={(e) => this.handleClick(e)} id='StatenIsland' src={'/staten.jpg'} alt='img'/></td>
                <td width="25%"><Link to='/home'><img id='Citywide' src={'/citywide.jpg'} alt='img'/></Link></td>
              </tr>
              </tbody>
              </table>
              </div>
          }
            </div>
          );
            }
        }