import React, {Component} from 'react'
import EachBorough from '../components/EachBorough'

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
            currentChoice: ''
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
                <EachBorough key={id} info={dict[id]} abbr={abbrDict[id]}/>
                <button onClick={this.returnClick}>CLOSE</button>
              </div>
            )
          
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
            currentChoice: event.target.id
          })
          this.iterateState(event.target.id)
        }
          render(){
            // let [bronx, brooklyn, nyc, queens, staten] = [this.state.bronx, this.state.brooklyn, this.state.manhattan, this.state.queens, this.state.statenIsland]
            return(
           <div>
              {this.state.showBorough ?
               this.iterateState(this.state.currentChoice) :
              <div>
              <h1>Select A Borough</h1>
              <table onClick={(e) => this.handleClick(e)} width="100%" cellSpacing="10" cellPadding='20'>
                <tbody>
              <tr>
                <td width="25%"><img id='Bronx' src={'/bronx.jpg'} alt='img'/></td>
                <td width="25%"><img id='Brooklyn' src={'/brooklyn.jpg'} alt='img'/></td>
              </tr>
              <tr>
                <td width="25%"><img id='Manhattan' src={'/nyc.jpg'} alt='img'/></td>
                <td width="25%"><img id='Queens' src={'/queens.jpg'} alt='img'/></td>
              </tr>
              <tr>
                <td width="25%"><img id='StatenIsland' src={'/staten.jpg'} alt='img'/></td>
                <td width="25%"><img id='Citywide' src={'/citywide.jpg'} alt='img'/></td>
              </tr>
              </tbody>
              </table>
              </div>
          }
          
                  {/* <p>Bronx: {bronx.CASE_COUNT}, {bronx.DEATH_COUNT}, {bronx.HOSPITALIZED_COUNT}</p>
                  <p>Brooklyn: {brooklyn.CASE_COUNT}</p>
                  <p>manhattan: {nyc.CASE_COUNT}</p>
                  <p>Queens: {queens.CASE_COUNT}</p>
                  <p>Staten Island: {staten.CASE_COUNT}</p> */}
                 
            </div>
          );
            }
        }