import React from 'react';
import ReactDOM from 'react-dom';
import Virginia from './virginia.jsx';
 
export default class MapUI extends React.Component {
  render() {
    return <div>
        <h1>MapUI</h1>
        <Virginia />
      </div>;
  }
}

ReactDOM.render(<MapUI/>, document.getElementById('mapUI'));