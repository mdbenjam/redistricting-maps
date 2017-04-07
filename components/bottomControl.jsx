import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Cell } from 'react-inline-grid';
import Dialog from 'material-ui/Dialog';

import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';

export default class BottomControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false
    }
  }

  showHelp() {
    this.setState({
      dialog: true
    });
  }

  hideHelp() {
    this.setState({
      dialog: false
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.hideHelp}
      />
    ];

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
          <FloatingActionButton
            mini={true}
            className="button-spacing"
            onClick={this.showHelp.bind(this)}
          >
            <i className="material-icons">help_outline</i>
          </FloatingActionButton>
        </div>
        <Dialog
          title="Information"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.hideHelp.bind(this)}
          autoScrollBodyContent={true}
        >
          <h2>What is redistricting?</h2>
          <p>Redistricting is the practice of adjusting voting districts (which are made up of precincts) that determines who represents us.  Redistricting occurs every 10 years, after the Census. The next Census is in 2020.  Gerrymandering is a practice intended to establish a political advantage for a particular party or group by manipulating district boundaries.  Gerrymandering = evil redistricting!</p>

          <h2>Why does redistricting matter?</h2>
          <p>Redistricting affects political power. It determines which party controls Congress and state and local governments across the country. Even when the population is divided equally, drawing the lines one way can reward Democrats and punish Republicans or vice versa. Some line-drawing can protect incumbents. Some line-drawing can guarantee they will face a potent challenger, either from their own party or the opposite party. Consequently, redistricting has a direct bearing on what matters a legislature chooses to tackle, and which to ignore.</p>

          <h2>What are the legal requirements for congressional districts?</h2>
          <ul>
            <li>A district should be contiguous</li>
            <li>A district should be compact</li>
            <li>A district should be equal in population "as practicable." (~727,421 people per district in this model)</li>
          </ul>

          <h2>So what's the situation in Virginia?</h2>
          <p>Virginia is one of the most gerrymandered states in the country, both on the congressional and state levels, based on lack of compactness and contiguity of its districts. Virginia congressional districts are ranked the 5th worst in the country because counties and cities are broken into multiple pieces to create heavily partisan districts.</p>

          <p>In March 2017, the Supreme Court on Wednesday told a lower court that it must reconsider whether Virginia's Republican-led legislature unconstitutionally gerrymandered about a dozen legislative districts in an effort to dilute the impact of African American voters.</p>

          <p>This site is a tool to model the explore the impact of how redistricting impacts projected outcome.</p>

          <h2>Additional Resources:</h2>

          <p><a href="http://redistricting.lls.edu/">Reference 1</a></p>
          <p><a href="http://www.chicagotribune.com/news/nationworld/ct-supreme-court-virginia-redistricting-racial-bias-20170301-story.html">Reference 2</a></p>
          <p><a href="http://www.dailykos.com/story/2016/8/2/1554138/-Democrats-are-already-gearing-up-for-our-next-redistricting-battle-in-2020">Reference 3</a></p>
          <p><a href="http://www.brennancenter.org/publication/citizens-guide-redistricting">Reference 4</a></p>
        </Dialog>
      </div>;
  }
}

BottomControl.propTypes = {
  onShowDemographics: PropTypes.func,
  onZoomOut: PropTypes.func,
  onZoomIn: PropTypes.func,
  showDemographicsButton: PropTypes.bool
};