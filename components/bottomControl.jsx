import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Cell } from 'react-inline-grid';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class BottomControl extends React.Component {
  render() {
    return <div>
        <div>
          <span className="left">
            <FloatingActionButton
              mini={true}
              className="button-spacing"
              onClick={this.props.onZoomOut}
            >
              <i className="material-icons">zoom_out</i>
            </FloatingActionButton>
          </span>
          <span className="middle">
            <RaisedButton
              className="button-spacing"
              onClick={this.props.onToggleDemographics}
              label={this.props.showDemographicsButton ? "See Demographics" : "See Population"}
              primary={true}
            />
          </span>
          <span className="right">
            <FloatingActionButton
              mini={true}
              className="button-spacing"
              onClick={this.props.onZoomIn}
            >
              <i className="material-icons">zoom_in</i>
            </FloatingActionButton>
          </span>
        </div>
        <div>
          
        </div>
      </div>;
  }
}

BottomControl.propTypes = {
  onShowDemographics: PropTypes.func,
  onZoomOut: PropTypes.func,
  onZoomIn: PropTypes.func,
  showDemographicsButton: PropTypes.bool
};