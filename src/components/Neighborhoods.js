import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/neighborhoods.css';

export default class Neighborhood extends Component {

    state = {
        data: {}
    }

    componentDidMount() {
        fetch('https://yibuf5tkd1.execute-api.us-east-1.amazonaws.com/dev/neighborhoods')
            .then(resp => resp.json())
            .then(data => {
                this.setState({data: data})
            })
    }

    //This component renders a table that shows data according to specific zip codes/neighborhoods
    render() {
        return (
            <div>
                <h1>Neighborhood Specific Data</h1>
                <div className="neighborhoods">
                    <Table className='neighborhood-table' striped bordered>
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
                            {Object.keys(this.state.data).map(zip => <tr>
                                    <td>{this.state.data[zip]['MODIFIED_ZCTA']}</td>
                                    <td>{this.state.data[zip]['NEIGHBORHOOD_NAME']}</td>
                                    <td>{this.state.data[zip]['BOROUGH_GROUP']}</td>
                                    <td>{this.state.data[zip]['COVID_CASE_COUNT']}</td>
                                    <td>{this.state.data[zip]['COVID_DEATH_COUNT']}</td>
                                    <td>{this.state.data[zip]['TOTAL_COVID_TESTS']}</td>
                                </tr>)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}