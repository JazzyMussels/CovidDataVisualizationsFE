import React from 'react'
import '../css/about.css';
export default function About() {
    return (
        <div id='about'>
            <img id='about-photo' src={'nycsky.jpg'} alt='main'/>
            <div id='blurb'>This site provides visual representations of the
                <a href='https://github.com/nychealth/coronavirus-data'>
                    Covid-19 Data
                </a>
                released by the New York City Health Department on August 18th, 2020.
                <br></br>
                <br></br>
                Here represented are various metrics across demographics, both for the city as a
                whole and for indivudal boroughs. The timeline of the data generally stretches
                from the beginning of March until August 18th. For most categories, you can
                switch between seeing numbers of cases, hospitilizations, and deaths.
                <br></br>
                <br></br>
                You can see citywide data according to race, age, sex, and poverty level. Each
                borough contains data that can subsequently be broken down according to race,
                gender, and age.
                <br></br>
                <br></br>
                There is a table that shows the data broken down by neighborhood, a composed
                chart with shows testing levels, and another composed chart that reflects cases,
                hospitilizations, and deaths over the last several months.
            </div>
        </div>
    )
}
