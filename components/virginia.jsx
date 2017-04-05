import React from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3';

export default class Virginia extends React.Component {
  drawMap() {
    $.get( "data/virginia", function( data ) {
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
      g.selectAll( "path" )
        .data( data.features )
        .enter()
        .append( "path" )
        .attr( "fill", "#ccc" )
        .attr( "d", path )
        .attr( "stroke", "red")
        .on('mouseover', function(d) {console.log(d); d3.select(this).attr( "fill", "blue")});

      console.log('done drawing');
    }, 'json');
  }

  componentDidMount() {
    this.drawMap();
  }

  render() {
    return <div id="virginiaMap"></div>
  }
}
