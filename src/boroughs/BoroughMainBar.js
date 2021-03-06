import React from 'react'
import {BarChart, Bar} from 'recharts';
import '../css/borough-main.css';

export default function BoroughMainBar(props) {
    let info = props.info
    // the data from props is parsed into the appropriate format for 
    // the recharts library to handle
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
        <div id='borough-main'>
            <div id='leftheader'>
                <h3>Total Cases Compared to Hospitilizations</h3>
            </div>
            <div id='rightheader'>
                <h3>Total Cases Compared to Deaths</h3>
            </div>
            {/* The appropriate charts are rendered for the total information from a given borough */}
            <div id='hospital-cases'>
                {props.dualChartInfo(BarChart, Bar, 600, 400, casesHospitalData, 'cases', 'hospitilizations')}
            </div>
            <div id='death-cases'>
                {props.dualChartInfo(BarChart, Bar, 600, 400, casesDeathData, 'cases', 'deaths')}
            </div>
        </div>
    )
}
