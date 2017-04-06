import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import request from 'superagent';

const NUMBER_OF_CONGRESSIONAL_DISTRICTS = 11;

export default class DistrictInfo extends React.Component {
  render() {
    let population = this.props.population;
    if (!population) {
      population = '-';
    }

    return <div>
        <div onClick={this.props.onClick} className="district-info">
          District: {this.props.districtNumber}
          Population: {population}
        </div>
      </div>;
  }
}

DistrictInfo.propTypes = {
  districtNumber: PropTypes.number.isRequired,
  population: PropTypes.number,
  onClick: PropTypes.func
};