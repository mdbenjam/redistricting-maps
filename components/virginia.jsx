import React from 'react';
import ReactDOM from 'react-dom';
import Emitter from 'es6-event-emitter';

import request from 'superagent';
import * as d3 from 'd3';

const LAST_THREE_DIGITS = 1000;

export default class Virginia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      districts: [],
      districtIndex: 0
    };
  }

  mouseOverPrecinct(d) {
    let districts = [...this.state.districts];
    if (!districts[this.state.districtIndex]) {
      districts[this.state.districtIndex] = [];
    }
    districts[this.state.districtIndex] = [...districts[this.state.districtIndex] || [], d];
    this.setState({
      districts
    });
  }

  drawMap() {
    let dispatcher = new Emitter();

    request.get('data/virginia/map').then((response) => {
      let data = JSON.parse(response.text);
        var width = 800,
            height = 800;

        var svg = d3.select( "#virginiaMap" )
          .append( "svg" )
          .attr( "width", width )
          .attr( "height", height );

        var g = svg.append( "g" );

        var projection = d3.geoProjection(function(x, y) { return [x, y];})
          .precision(0).scale(1).translate([0, 0]);

        var path = d3.geoPath().projection(projection);

        var bounds = path.bounds(data),
            scale  = 10 * .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, 
                    (bounds[1][1] - bounds[0][1]) / height),
            transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2 + 171/0.0023374678127024*scale, 
                    (height - scale * (bounds[1][1] + bounds[0][1])) / 2 + 85/0.0023374678127024*scale];

        projection.scale(scale).translate(transl);

        console.log('drawing');
        let component = this;
        g.selectAll( "path" )
          .data( data.features )
          .enter()
          .append( "path" )
          .attr( "fill", "#ccc" )
          .attr( "d", path )
          .attr( "stroke", "red")
          .on('mouseover', function(d) {
            console.log(d);
            d3.select(this).attr( "fill", "blue");
            dispatcher.trigger('precinct:mouseover', d);
          });
        console.log('done drawing');
        }).
      catch(() => {

      });
    return dispatcher;
  }

  componentDidMount() {

    request.get("data/virginia/demographics").then((response) => {
      let data = JSON.parse(response.text);
      this.demographics = data;
    });

    let dispatcher = this.drawMap();
    dispatcher.on('precinct:mouseover', this.mouseOverPrecinct.bind(this));
    this.dispatcher = dispatcher;
  }

  render() {
    let population = (this.state.districts[this.state.districtIndex] || []).reduce((acc, district) => {
      return parseInt(this.demographics[parseInt(district.properties.Number, 10) % LAST_THREE_DIGITS].Population, 10) + acc;
    }, 0);

    return <div>
        Total Population: {population}
        <div id="virginiaMap" />
      </div>
  }
}


Virginia.defaultValues = {
  numDistricts: 10
};