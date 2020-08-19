import React, {Component} from 'react'
import EachBorough from '../boroughs/EachBorough'
import {Link} from 'react-router-dom';
import '../css/borough.css';

export default class Borough extends Component {

    // showBorough will determine whether a specific borough's data is rendered or not
    // currentChoice will toggle between each borough, and showCategory will be passed
    // down to a child component to determine whether or not the category options are displayed;
    // A ref is also created to push a user to the top of the page upon a button click
    constructor() {
        super()
        this.state = {
            bronx: {},
            brooklyn: {},
            manhattan: {},
            queens: {},
            statenIsland: {},
            showBorough: false,
            currentChoice: '',
            showCategory: false
        }
        this.pageRef = React.createRef();
    }

    //function to invoke the page scroll based on the ref, the attribute 'current' lets
    //a user access the given DOM node
    scrollToTop = () => {
        this.pageRef.current.scrollIntoView({behavior: 'smooth'})
    }

    componentDidMount() {
        fetch('http://localhost:3001/boroughs')
            .then(resp => resp.json())
            .then(data => {
                this.setState({bronx: data["Bronx"], brooklyn: data['Brooklyn'], manhattan: data['Manhattan'], queens: data['Queens'], statenIsland: data['StatenIsland']})
            })
    }

    //a boolean toggle to show/hide the category options
    updateShowCategory = () => {
        this.setState({
            showCategory: !this.state.showCategory
        })
    }

    //handles the return to borough selection page from a specific borough
    returnClick = () => {
        this.setState({
            showBorough: !this.state.showBorough,
            currentChoice: ''
        })
    }

    //handles the switch from the borough selection page to a specific borough
    //and invokes the function to pass down the appropriate information to the
    //child component based on the id obtained from the passed in event
    handleClick = (event) => {
        this.setState({
            showBorough: !this.state.showBorough,
            currentChoice: event.target.id
        })
        this.iterateState(event.target.id)
    }

    iterateState = (id) => {
        let dict = {
            'Bronx': this.state.bronx,
            'Brooklyn': this.state.brooklyn,
            'Manhattan': this.state.manhattan,
            'Queens': this.state.queens,
            'StatenIsland': this.state.statenIsland
        }
        //this will be needed in the child component as the data categories have
        //a prefix based on the borough
        let abbrDict = {
            'Bronx': 'BX_',
            'Brooklyn': 'BK_',
            'Manhattan': 'MN_',
            'Queens': 'QN_',
            'StatenIsland': 'SI_'
        }
        //using the id from a button click and the above key/value pairs, we pass the
        //correct data from state to the child component, along with the ref, the particulars
        //of the graphs to be rendered, and the various event handlers to toggle what data is shown 
        return (
            <div>
                <EachBorough
                    scroll={this.scrollToTop}
                    chartInfo={this.props.chartInfo}
                    dualChartInfo={this.props.dualChartInfo}
                    info={dict[id]}
                    abbr={abbrDict[id]}
                    showCategory={this.state.showCategory}
                    updateShowCategory={this.updateShowCategory}
                    returnClick={this.returnClick}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                {/* the ref that will ensure the user is returned to the top of the page on return click */}
                <div ref={this.pageRef}></div>
                {/* Here we toggle between the specific borough information and a table which lets
                    the user select from among all the boroughs */}
                {this.state.showBorough
                    ? this.iterateState(this.state.currentChoice)
                    : <div>
                        <div>
                            <h1>Select A Borough</h1>
                        </div>

                        <table id='bo-table' width="100%" cellSpacing="10" cellPadding='20'>
                            <tbody>
                                <tr>
                                    <td width="25%"><img
                                        className='borough-img'
                                        onClick={(e) => this.handleClick(e)}
                                        id='Bronx'
                                        src={'/bronx.jpg'}
                                        alt='img'/></td>
                                    <td width="25%"><img
                                        className='borough-img'
                                        onClick={(e) => this.handleClick(e)}
                                        id='Brooklyn'
                                        src={'/brooklyn.jpg'}
                                        alt='img'/></td>
                                </tr>
                                <tr>
                                    <td width="25%"><img
                                        className='borough-img'
                                        onClick={(e) => this.handleClick(e)}
                                        id='Manhattan'
                                        src={'/nyc.jpg'}
                                        alt='img'/></td>
                                    <td width="25%"><img
                                        className='borough-img'
                                        onClick={(e) => this.handleClick(e)}
                                        id='Queens'
                                        src={'/queens.jpg'}
                                        alt='img'/></td>
                                </tr>
                                <tr>
                                    <td width="25%"><img
                                        className='borough-img'
                                        onClick={(e) => this.handleClick(e)}
                                        id='StatenIsland'
                                        src={'/staten.jpg'}
                                        alt='img'/></td>
                                    <td width="25%">
                                        <Link to='/home'><img className='borough-img' id='Citywide' src={'/citywide.jpg'} alt='img'/></Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
}
            </div>
        );
    }
}