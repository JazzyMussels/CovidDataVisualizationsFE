import React, {Component} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar} from 'recharts';
// ScatterChart, Scatter, LabelList
export default class BoroughAgeCharts extends Component {

    customTooltip = ({ active, payload, label }) => {
        return active && (
          <div className="custom-tooltip">
            <h1 className="label" style={{ color: 'black' }}>Ages: {label}</h1>
            <p className="label" style={{ color: 'black' }}>{`${payload[0]['name']} : ${payload[0].value}`}</p>
          </div>
        );
    };

    setCaseTicks = () => {
      switch (this.props.abbr){
        case 'BX_':
          return [...Array(20).keys() ].map( i => i*1000)
        case 'BK_':
          return [...Array(24).keys() ].map( i => i*1000)
        case 'MN_':
          return [...Array(12).keys() ].map( i => i*1000)
        case 'QN_':
          return [...Array(27).keys() ].map( i => i*1000)
        case 'SI_':
          return [...Array(7).keys() ].map( i => i*1000)
        default:
          return null
    }
  }

  setHospitalTicks = () => {
    return this.props.abbr === 'MN_' ? [...Array(10).keys() ].map( i => i*300) : null
}

  setDeathTicks = () => {
    switch (this.props.abbr){
      case 'BX_':
        return [...Array(10).keys() ].map( i => i*200)
      case 'BK_':
        return [...Array(10).keys() ].map( i => i*300)
      case 'MN_':
        return [...Array(9).keys() ].map( i => i*200)
      case 'QN_':
        return [...Array(10).keys() ].map( i => i*300)
      case 'SI_':
        return [...Array(6).keys() ].map( i => i*100)
      default:
        return null
  }
  }


    render(){
        let deathCount = `${this.props.abbr}DEATH_COUNT`
        let hospitalizedCount = `${this.props.abbr}HOSPITALIZED_COUNT`
        let caseCount = `${this.props.abbr}CASE_COUNT`
        let info = this.props.info

        return(    
            <div>
            {this.props.mode === 'cases' && <LineChart
            width={700}
            height={700}
            data={this.props.info['0-17'] && [
                {
                'name': "0-17", 'cases': info["0-17"][caseCount], 'amt': info["0-17"][caseCount]
                },
                {
                'name': '18-44', 'cases': info['18-44'][caseCount], 'amt': info['18-44'][caseCount]
                },
                {
                'name': '45-64', 'cases': info['45-64'][caseCount], 'amt': info['45-64'][caseCount]
                },
                {
                'name': '65-74', 'cases': info['65-74'][caseCount], 'amt': info['65-74'][caseCount]
                },
                {
                'name': '75+', 'cases': info['75+'][caseCount], 'amt': info['75+'][caseCount]
                }] 
              
            }
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='black' />
                <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
                <YAxis stroke='black' tick={{ fill: 'black', fontSize: 10 }} ticks={this.setCaseTicks()} />
                <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
                <Legend />
            <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
          </LineChart>
            }
            {this.props.mode === 'deaths' &&  <BarChart
        width={700}
        height={700}
        data={this.props.info['0-17'] && [ 
            {
            'name': '0-17', 'deaths': info["0-17"][deathCount], 'amt': info["0-17"][deathCount]
            },
            {
            'name': '18-44', 'deaths': info['18-44'][deathCount], 'amt': info['18-44'][deathCount]
            },
            {
            'name': '45-64', 'deaths': info['45-64'][deathCount], 'amt': info['45-64'][deathCount]
            },
            {
            'name': '65-74', 'deaths': info['65-74'][deathCount], 'amt': info['65-74'][deathCount]
            },
            {
            'name': '75+', 'deaths': info['75+'][deathCount], 'amt': info['75+'][deathCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3"  stroke="black"/>
        <XAxis dataKey="name" stroke='black' tick={{ fill: 'black', fontSize: 10 }}/>
        <YAxis stroke='black' tick={{ fill: 'black' }}ticks={this.setDeathTicks()}/>
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
        <Legend />
        <Bar dataKey="deaths" fill="#8884d8" />
      </BarChart>
            }
            {this.props.mode === 'hospitilizations' &&    <BarChart
        width={700}
        height={700}
        data={this.props.info['0-17'] && [ 
            {
            'name': '0-17', 'hospitilizations': info["0-17"][hospitalizedCount], 'amt': info["0-17"][hospitalizedCount]
            },
            {
            'name': '18-44', 'hospitilizations': info['18-44'][hospitalizedCount], 'amt': info['18-44'][hospitalizedCount]
            },
            {
            'name': '45-64', 'hospitilizations': info['45-64'][hospitalizedCount], 'amt': info['45-64'][hospitalizedCount]
            },
            {
            'name': '65-74', 'hospitilizations': info['65-74'][hospitalizedCount], 'amt': info['65-74'][hospitalizedCount]
            },
            {
            'name': '75+', 'hospitilizations': info['75+'][hospitalizedCount], 'amt': info['75+'][hospitalizedCount]
            }] 
        }
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke='black' tick={{ fill: 'black', fontSize: 10 }} strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke='black' tick={{ fill: 'black' }}/>
        <YAxis stroke='black' tick={{ fill: 'black' }} ticks={this.setHospitalTicks()}/>
        <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} content={this.customTooltip}/>
        <Legend />
        <Bar dataKey="hospitilizations" fill="#8884d8" />
      </BarChart>
            }
            </div>
        )
    }
}

//    {/* <ScatterChart
//         width={700}
//         height={700}
//         margin={{
//           top: 20, right: 20, bottom: 20, left: 20,
//         }}
//       >
//         <CartesianGrid />
//         <XAxis type="number" dataKey="x" />
//         <YAxis type="number" dataKey="y" />
//         {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
//         {/* <Scatter 
//             data={info['0-17'] && [
//                 { x: "0-17", y: info["0-17"][deathCount], z: 200 },
//                 { x: "18-44", y: info["18-44"][deathCount], z: 260 },
//                 { x: "45-64", y: info["45-64"][deathCount], z: 400 },
//                 { x: "65-74", y: info["65-74"][deathCount], z: 280 },
//                 { x: "75+", y: info["75+"][deathCount], z: 500 },
//             ]
//             } 
//             fill="#8884d8">
//           <LabelList dataKey="x" />
//         </Scatter>
//       </ScatterChart> */} 



