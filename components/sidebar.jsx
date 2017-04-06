import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import DistrictInfo from './districtInfo.jsx';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import request from 'superagent';

const NUMBER_OF_CONGRESSIONAL_DISTRICTS = 11;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sliding: false
    };
  }

  onSlideEnd() {
    this.setState({
      sliding: false
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showDemographics !== nextProps.showDemographics) {
      this.setState({
        sliding: true
      });
    }
  }

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

    let className;
    if (this.props.showDemographics) {
      className = "sidebar-demographics-page-in";
      if (this.state.sliding) {
        className = className + " sidebar-slide-in";
      }
    }

    if (!this.props.showDemographics) {
      className = "sidebar-demographics-page-out";
      if (this.state.sliding) {
        className = className + " sidebar-slide-out";
      }
    }

    return <div>
        <Paper className="sidebar-paper" zDepth={2} rounded={false}>
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
        <div className={className} onAnimationEnd={this.onSlideEnd.bind(this)}>
          <Paper className="sidebar-paper" zDepth={3} rounded={false}>
            <div className="">
              <Table onRowSelection={(rows) => {this.props.onChangeDistrict(rows[0])}}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Demographics</TableHeaderColumn>
                    <TableHeaderColumn>Demographics</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                  {districts}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
      </div>;
  }
}

Sidebar.propTypes = {
  numDistricts: PropTypes.number.isRequired,
  districts: PropTypes.array,
  demographics: PropTypes.object,
  onChangeDistrict: PropTypes.func,
  districtIndex: PropTypes.number,
  showDemographics: PropTypes.bool
};