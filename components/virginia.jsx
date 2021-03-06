import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Emitter from 'es6-event-emitter';

import request from 'superagent';
import * as d3 from 'd3';

export default class Virginia extends React.Component {
  drawMap() {
    request.get('data/virginia/map').then((response) => {
      let data = JSON.parse(response.text);
      let mapDiv = document.getElementById('map');

        let width = mapDiv.offsetWidth;
        let height = mapDiv.offsetHeight;

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
                    (height - scale * (bounds[1][1] + bounds[0][1])) / 2 + 88/0.0023374678127024*scale];

        projection.scale(scale).translate(transl);

        console.log('drawing');
        let component = this;
        let paths = g.selectAll( "path" )
          .data( data.features )
          .enter()
          .append( "path" )
          .attr( "fill", "#ccc" )
          .attr( "d", path )
          .attr( "stroke", "red")
          .attr( "stroke-width", .2);
        console.log('done drawing');
        }).
      catch(() => {
      });
  }

  colorPrecinct(color, callback) {
    return function(d) {
      d3.select(this).attr( "fill", color);
      callback(d);
    }
  };

  setMouseOverEvent(color, callback) {
    let g = d3.select( "#virginiaMap" ).select("g");
    g.selectAll( "path" ).on('mouseover', this.colorPrecinct(color, callback));
  }

  removeMouseOverEvent() {
    let g = d3.select( "#virginiaMap" ).select("g");
    g.selectAll( "path" ).on('mouseover', null);
  }

  componentDidMount() {
    this.drawMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isZooming) {
      let g = d3.select( "#virginiaMap" ).select("g");
      g.selectAll( "path" ).on('mousedown', null);
    } else {
      let g = d3.select( "#virginiaMap" ).select("g");
      g.selectAll( "path" ).on('mousedown', this.colorPrecinct(nextProps.color, nextProps.mouseOverPrecinct));
    }
  }

  onMouseDown(event) {
    if (!this.props.isZooming) {
      this.setMouseOverEvent(this.props.color, this.props.mouseOverPrecinct);
    }
  }

  onMouseUp(event) {
    if (this.props.isZooming) {
      this.props.onMapClick(event);
    } else {
      this.removeMouseOverEvent();
    }
  }

  onMouseLeave(event) {
    if (!this.props.isZooming) {
      this.removeMouseOverEvent();
    }
  }

  render() {
    return <div>
        <div
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
          id="virginiaMap"
          style={{transform: `translate(${this.props.coordinates.x}px, ${this.props.coordinates.y}px) scale(${this.props.zoom})`}}
        />
      </div>
  }
}

Virginia.propTypes = {
  mouseOverPrecinct: PropTypes.func.isRequired,
  onMapClick: PropTypes.func,
  numDistricts: PropTypes.number,
  zoom: PropTypes.number,
  coordinates: PropTypes.object,
  isZooming: PropTypes.bool
};