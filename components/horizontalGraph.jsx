import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import request from 'superagent';

export default class HorizontalGraph extends React.Component {
  render() {
    let total = this.props.data.reduce((acc, data) => {
      return acc + data.number;
    }, 0);

    let left = 0;

    let bars = this.props.data.reduce((acc, data) => {
      let percent = (data.number / total * 100);
      left = left + percent;
      return [...acc, 
        <span className="bar" style={
          {
            backgroundColor: data.color,
            width: percent + '%',
            left: (left - percent) + '%'
          }} />
      ];
    }, []);

    return <div className="bar-graph">
        { bars }
      </div>;
  }
}

HorizontalGraph.propTypes = {
  data: PropTypes.array
};