import React, {Component} from 'react'
import BoroughMainBar from './BoroughMainBar'
import BoroughDemographic from './BoroughDemographic'
import '../css/each-borough.css'

export default class EachBorough extends Component {

    // this will toggle between showing an option to pick a category(race, age, sex) and showing 
    //one of said categories
    state = {
        mode: 'all'
    }

    //click handler for the toggle to determine what information is being shown
    handleClick = (event) => {
        this.setState({mode: event.target.id})
        this.props.updateShowCategory()
    }

    //returns to the main borough selection page at the top based on the ref in the parent component
    handleReturn = () => {
        this.props.returnClick()
        this.props.scroll()
    }

    //the child component contains the graph information and is meant to be re-useable by all demographic types;
    //as a result it was necessary to specify axis ticks for each category of each demographic. The next
    //several methods set the ticks according to the needs of each data set based on the particular borough
    setRaceCaseTicks = () => {
        switch (this.props.abbr) {
            case 'BX_':
                return [...Array(18).keys()].map(i => i * 1000)
            case 'BK_':
                return [...Array(13).keys()].map(i => i * 1100)
            case 'MN_':
                return [...Array(7).keys()].map(i => i * 1000)
            case 'QN_':
                return [...Array(13).keys()].map(i => i * 1100)
            case 'SI_':
                return [...Array(7).keys()].map(i => i * 1000)
            default:
                return []
        }
    }

    setRaceHospitalTicks = () => {
        switch (this.props.abbr) {
            case 'BX_':
                return [...Array(7).keys()].map(i => i * 1000)
            case 'BK_':
                return [...Array(7).keys()].map(i => i * 1000)
            case 'MN_':
                return [...Array(14).keys()].map(i => i * 200)
            case 'QN_':
                return [...Array(7).keys()].map(i => i * 1000)
            case 'SI_':
                return [...Array(8).keys()].map(i => i * 200)
            default:
                return []
        }
    }

    setRaceDeathTicks = () => {
        switch (this.props.abbr) {
            case 'BX_':
                return [...Array(11).keys()].map(i => i * 200)
            case 'BK_':
                return [...Array(12).keys()].map(i => i * 200)
            case 'MN_':
                return [...Array(11).keys()].map(i => i * 100)
            case 'QN_':
                return [...Array(10).keys()].map(i => i * 200)
            case 'SI_':
                return [...Array(7).keys()].map(i => i * 100)
            default:
                return []
        }
    }

    setSexCaseTicks = () => {
        return []
    }
    setSexDeathTicks = () => {
        return []
    }

    setSexHospitalTicks = () => {
        return this.props.abbr === 'QN_'
            ? [...Array(12).keys()].map(i => i * 1000)
            : []
    }

    setAgeCaseTicks = () => {
        switch (this.props.abbr) {
            case 'BX_':
                return [...Array(20).keys()].map(i => i * 1000)
            case 'BK_':
                return [...Array(24).keys()].map(i => i * 1000)
            case 'MN_':
                return [...Array(12).keys()].map(i => i * 1000)
            case 'QN_':
                return [...Array(27).keys()].map(i => i * 1000)
            case 'SI_':
                return [...Array(7).keys()].map(i => i * 1000)
            default:
                return []
        }
    }

    setAgeHospitalTicks = () => {
        return this.props.abbr === 'MN_'
            ? [...Array(10).keys()].map(i => i * 300)
            : []
    }

    setAgeDeathTicks = () => {
        switch (this.props.abbr) {
            case 'BX_':
                return [...Array(10).keys()].map(i => i * 200)
            case 'BK_':
                return [...Array(10).keys()].map(i => i * 300)
            case 'MN_':
                return [...Array(9).keys()].map(i => i * 200)
            case 'QN_':
                return [...Array(10).keys()].map(i => i * 300)
            case 'SI_':
                return [...Array(6).keys()].map(i => i * 100)
            default:
                return []
        }
    }

    render() {
        let borough = this.props.info.BOROUGH_GROUP
        return (
            <div id='each-borough'>
                <h1>
                    {borough === 'Bronx' && `Data For The ${borough}`}
                    {borough === 'StatenIsland' && 'Data For Staten Island'}
                    {(borough === 'Brooklyn' || borough === 'Queens' || borough === 'Manhattan') && `Data For ${borough}`}
                </h1>
                {/* The main bar will render boroughwide data not separated by demographic */}
                <BoroughMainBar
                    key={this.props.abbr}
                    info={this.props.info}
                    dualChartInfo={this.props.dualChartInfo}/> 
                    {/* with mode set to all, the series of buttons is rendered to prompt
                        the user to select a category */}
                    {this.state.mode === 'all' && <div id='category-div'>
                    <h2>Select a Category</h2>
                    <table width="100%" cellSpacing="10" cellPadding='20'>
                        <tbody>
                            <tr>
                                <td width="25%"><img
                                    onClick={(e) => this.handleClick(e)}
                                    className='category-img'
                                    id='age'
                                    src={'/res_age.png'}
                                    alt='img'/></td>
                                <td width="25%"><img
                                    onClick={(e) => this.handleClick(e)}
                                    className='category-img'
                                    id='sex'
                                    src={'/res_sex.png'}
                                    alt='img'/></td>
                                <td width="25%"><img
                                    onClick={(e) => this.handleClick(e)}
                                    className='category-img'
                                    id='race'
                                    src={'/res_race.png'}
                                    alt='img'/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
                {/* The reuseable component is rendered with the appropriate information based on demographic category;
                    the appropriate ticks, charts, categories, url, and borough information are passed down  */}
                {this.state.mode === 'race' && <BoroughDemographic
                    url={'borough_race'}
                    demo={'Race'}
                    caseTicks={this.setRaceCaseTicks}
                    deathTicks={this.setRaceDeathTicks}
                    hospitalTicks={this.setRaceHospitalTicks}
                    chartInfo={this.props.chartInfo}
                    borough={borough}
                    abbr={this.props.abbr}
                    categories={['Asian/Pacific-Islander', "Black/African-American", "Hispanic/Latino", "White", undefined]}></BoroughDemographic>}
                {this.state.mode === 'sex' && <BoroughDemographic
                    url={'borough_sex'}
                    demo={'Sex'}
                    caseTicks={this.setSexCaseTicks}
                    deathTicks={this.setSexDeathTicks}
                    hospitalTicks={this.setSexHospitalTicks}
                    chartInfo={this.props.chartInfo}
                    borough={borough}
                    abbr={this.props.abbr}
                    categories={["Male", "Female", undefined, undefined, undefined]}></BoroughDemographic>}
                {this.state.mode === 'age' && <BoroughDemographic
                    url={'borough_age'}
                    demo={'Age'}
                    caseTicks={this.setAgeCaseTicks}
                    deathTicks={this.setAgeDeathTicks}
                    hospitalTicks={this.setAgeHospitalTicks}
                    chartInfo={this.props.chartInfo}
                    borough={borough}
                    abbr={this.props.abbr}
                    categories={['0-17', '18-44', '45-64', '65-74', '75+']}></BoroughDemographic>}
                
                {/* this toggle determines whether the button directs the user back to the category selection page 
                    or to the borough selection page */}
                {this.props.showCategory
                    ? <button id='all' className='return-btn' onClick={(e) => this.handleClick(e)}>See all Categories</button>
                    : <button className='return-btn' onClick={this.handleReturn}>See All Boroughs</button>}
            </div>
        )
    }
}