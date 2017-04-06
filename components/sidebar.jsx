import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DistrictInfo from './districtInfo.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import request from 'superagent';

const NUMBER_OF_CONGRESSIONAL_DISTRICTS = 11;

export default class Sidebar extends React.Component {
  render() {
    let districts = [];

    for (let index = 0; index < this.props.numDistricts; index++) {
      let population = ([...(this.props.districts[index] || [])]).reduce((acc, district) => {
        let precinctNumber = parseInt(district.properties.Number, 10);
        let demographics = this.props.demographics[precinctNumber];
        if (!demographics)
          return acc;
        return parseInt(demographics.Population, 10) + acc;
      }, 0);
      districts.push(<TableRow selected={index === this.props.districtIndex} key={index}>
          <TableRowColumn>{index + 1}</TableRowColumn>
          <TableRowColumn>{population}</TableRowColumn>
        </TableRow>);
    }

    return <div>
        <Paper className="sidebar-paper" zDepth={3} rounded={false}>
          <div className="">
            <Table onRowSelection={(rows) => {this.props.onChangeDistrict(rows[0])}}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>District Number</TableHeaderColumn>
                  <TableHeaderColumn>Population</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                {districts}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>;
  }
}

Sidebar.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  districts: PropTypes.array,
  demographics: PropTypes.object,
  onChangeDistrict: PropTypes.func,
  districtIndex: PropTypes.number
};