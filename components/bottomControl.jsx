import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Cell } from 'react-inline-grid';

import RaisedButton from 'material-ui/RaisedButton';

export default class BottomControl extends React.Component {
  render() {
    return <div>
        <Grid>
          <Row is="center">
            <RaisedButton label="See Demographics" primary={true} />
          </Row>
        </Grid>
      </div>;
  }
}

// BottomControl.propTypes = {
// };