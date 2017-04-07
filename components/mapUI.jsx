import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Virginia from './virginia.jsx';
import Sidebar from './sidebar.jsx';
import BottomControl from './bottomControl.jsx';
import request from 'superagent';

const NUMBER_OF_CONGRESSIONAL_DISTRICTS = 11;
const COLORS = [
  "#5484A4",
  "#F6D155",
  "#004B8D",
  "#F2552C",
  "#95DEE3",
  "#EDCDC2",
  "#88B04B",
  "#CE3175",
  "#CFB095",
  "#5A7247",
  "#00afa8"
]

export default class MapUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      districts: [],
      districtIndex: 0,
      showDemographics: false,
      zoomRate: 1,
      zoom: 1,
      coordinates: {x: 0, y: 0}
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

  onToggleDemographics() {
    this.setState({
      showDemographics: !this.state.showDemographics
    });
  }

  onZoomIn() {
    this.setState({
      zoomRate: 2
    });
  }

  onZoomOut() {
    let zoomRate = .5;
    let zoom = this.state.zoom * zoomRate;
    if (zoom < 1) {
      return;
    }

    if (zoom === 1) {
      this.setState({
        zoom,
        coordinates: {
          x: 0,
          y: 0
        }
      });
    } else {
      let coordinates = {
        x: (this.state.coordinates.x) * zoomRate,
        y: (this.state.coordinates.y) * zoomRate
      };
      this.setState({
        zoom,
        coordinates
      });
    }
  }

  onMapClick(event) {
    if (this.state.zoomRate > 1) {
      let map = document.getElementById('map');
      let tx = this.state.coordinates.x;
      let ty = this.state.coordinates.y;
      let cx = map.clientWidth / 2;
      let cy = map.clientHeight / 2;
      let ex = event.clientX;
      let ey = event.clientY;

      let coordinates = {
        x: (tx + cx - ex) * this.state.zoomRate,
        y: (ty + cy - ey) * this.state.zoomRate
      };

      this.setState({
        zoom: this.state.zoom * this.state.zoomRate,
        zoomRate: 1,
        coordinates
      });
    }
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
                onMapClick={this.onMapClick.bind(this)}
                zoom={this.state.zoom}
                coordinates={this.state.coordinates}
                isZooming={this.state.zoomRate !== 1}
              />
            </div>
            <div className="bottomControl">
              <BottomControl
                onToggleDemographics={this.onToggleDemographics.bind(this)}
                onZoomIn={this.onZoomIn.bind(this)}
                onZoomOut={this.onZoomOut.bind(this)}
                showDemographicsButton={!this.state.showDemographics}
              />
            </div>
          </div>
          <div className="sidebar">
            <Sidebar
              numDistricts={NUMBER_OF_CONGRESSIONAL_DISTRICTS}
              demographics={this.demographics}
              districts={this.state.districts}
              onChangeDistrict={this.onChangeDistrict.bind(this)}
              districtIndex={this.state.districtIndex}
              showDemographics={this.state.showDemographics}
            />
          </div>
        </div>
      </MuiThemeProvider>;
  }
}

ReactDOM.render(<MapUI/>, document.getElementById('mapUI'));