import React, {Component} from 'react'
import {BarChart, Bar} from 'recharts';
import '../css/citywide.css';

export default class Citywide extends Component {

    //a ref is created, it will be used to bring a particular div into view on a button click
    constructor() {
        super()
        this.scrollRef = React.createRef();
        this.state = {
            data: {}
        }
    }

    //this function brings the ref into view, the attribute 'current' lets
    //a user access the given DOM node
    scrollToBottom = () => {
        this.scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/boroughs')
            .then(res => res.json())
            .then(data => {
                this.setState({data: data['Citywide']})
            })
    }

    render() {
        let info = this.state.data
        let casesHospitalData = [
            {
                name: 'Cases/Hospitilizations',
                'cases': info.CASE_COUNT,
                'hospitilizations': info.HOSPITALIZED_COUNT,
                'amt': info.HOSPITALIZED_COUNT
            }
        ]
        let casesDeathData = [
            {
                name: 'Cases/Deaths',
                'cases': info.CASE_COUNT,
                'deaths': info.DEATH_COUNT,
                'amt': info.DEATH_COUNT
            }
        ]
        return (
            <div id='citywide'>
                <div>
                    <img id='main-photo' src={'title.png'} alt='main'/>
                    {/* here the function is called so that clicking the image scrolls the user to the ref point;
                        we also change the source of the image(with mouseOut and Over) when the user highlights 
                        it to amplify the signal that it ought to be clicked */}
                    <img
                        id='arrow-photo'
                        onClick={this.scrollToBottom}
                        src={'downfing.png'}
                        onMouseOut={e => (e.currentTarget.src = "downfing.png")}
                        onMouseOver={e => (e.currentTarget.src = "whitfing.png")}
                        alt='main'/>
                </div>
                {/* here is the reference point for the page scroll */}
                <div id='title-card' ref={this.scrollRef}>
                    <h2>The Impact of Coronavirus Across All 5 Boroughs</h2>
                </div>
                <div id='leftheader'>
                    <h3>Total Cases Compared to Hospitilizations</h3>
                </div>
                <div id='rightheader'>
                    <h3>Total Cases Compared to Deaths</h3>
                </div>
                {/* Here the particular charts are rendered for dual categories, with specified widths and heights(580) */}
                <div id='hospital-cases'>
                    {this
                        .props
                        .dualChartInfo(BarChart, Bar, 580, 580, casesHospitalData, 'cases', 'hospitilizations')}
                </div>
                <div id='death-cases'>
                    {this
                        .props
                        .dualChartInfo(BarChart, Bar, 580, 580, casesDeathData, 'cases', 'deaths')}
                </div>
            </div>
        )
    }
}
