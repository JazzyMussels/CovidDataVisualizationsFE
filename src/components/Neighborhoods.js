import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/neighborhoods.css';

export default class Neighborhood extends Component {
    constructor(){
        super()
        this.state={
          }
          }
        
          componentDidMount(){
            fetch('http://localhost:3001/neighborhoods')
            .then(resp => resp.json())
            .then(data => {
                for (const key in data){
              this.setState({
              [key]: data[key],
            })
        }
          })
          }
        
          render(){
            return(
              <div>
              <h1>Neighborhood Specific Data</h1>
              <div className="neighborhoods">
              <Table  className='neighborhood-table' striped bordered >
  <thead>
    <tr color='#F26B38'>
      <th color='#F26B38'>Zip Code</th>
      <th>Neighborhood</th>
      <th>Borough</th>
      <th>Total Cases</th>
      <th>Total Deaths</th>
      <th>Total Tests</th>
    </tr>
  </thead>
  <tbody>
  {Object.keys(this.state).map(zip => 
    <tr>
    <td>{this.state[zip]['MODIFIED_ZCTA']}</td>
    <td>{this.state[zip]['NEIGHBORHOOD_NAME']}</td>
    <td>{this.state[zip]['BOROUGH_GROUP']}</td>
    <td>{this.state[zip]['COVID_CASE_COUNT']}</td>
    <td>{this.state[zip]['COVID_DEATH_COUNT']}</td>
    <td>{this.state[zip]['TOTAL_COVID_TESTS']}</td>
  </tr>
    )
  }
  </tbody>
</Table>
</div>
</div>
            )}
        }