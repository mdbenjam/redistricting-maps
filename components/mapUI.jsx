import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Virginia from './virginia.jsx';
import Sidebar from './sidebar.jsx';
import BottomControl from './bottomControl.jsx';

import request from 'superagent';

const NUMBER_OF_CONGRESSIONAL_DISTRICTS = 11;
const COLORS = [
  "rgb(241, 196, 5)",
  "rgb(22, 160, 134)",
  "rgb(45, 204, 112)",
  "rgb(210, 84, 0)",
  "rgb(42, 128, 185)",
  "rgb(232, 76, 61)",
  "rgb(155, 88, 181)",
  "rgb(45, 62, 80)",
  "rgb(243, 156, 17)",
  "rgb(53, 152, 219)",
  "rgb(133, 122, 40)"
]


export default class MapUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      districts: [],
      districtIndex: 0
    };
  }

  componentDidMount() {
    request.get("data/virginia/demographics").then((response) => {
      let data = JSON.parse(response.text);
      this.demographics = data;
    });
  }

  mouseOverPrecinct(d) {
    let districts = [...this.state.districts];
    if (!districts[this.state.districtIndex]) {
      districts[this.state.districtIndex] = new Set();
    }
    let set = new Set(districts[this.state.districtIndex]);
    set.add(d);

    districts.forEach((district, index) => {
      if (index !== this.state.districtIndex && district && district.has(d)) {
        let set2 = new Set(district);
        set2.delete(d);
        districts[index] = set2;
      }
    });
    districts[this.state.districtIndex] = set;
    this.setState({
      districts
    });
  }

  onChangeDistrict(index) {
    let setIndex = index;
    if (index === undefined || index === null) {
      setIndex = this.state.districtIndex;
    }
    this.setState({
      districtIndex: setIndex
    });
  }

  render() {
    return <MuiThemeProvider>
        <div>
          <div className="main">
            <div id="map" className="map">
              <Virginia
                mouseOverPrecinct={this.mouseOverPrecinct.bind(this)}
                numDistricts={NUMBER_OF_CONGRESSIONAL_DISTRICTS}
                color={COLORS[this.state.districtIndex]}
              />
            </div>
            <div className="bottomControl">
              <BottomControl />
            </div>
          </div>
          <div className="sidebar">
            <Sidebar
              numDistricts={NUMBER_OF_CONGRESSIONAL_DISTRICTS}
              demographics={this.demographics}
              districts={this.state.districts}
              onChangeDistrict={this.onChangeDistrict.bind(this)}
              districtIndex={this.state.districtIndex}
            />
          </div>
        </div>
      </MuiThemeProvider>;
  }
}

ReactDOM.render(<MapUI/>, document.getElementById('mapUI'));