import React, { Component } from 'react';
import logo from './logo.png';
import seed from './seed.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MeshKorea Dart Tournament 2017</h2>
        </div>
        <div>
          <img src={seed} alt={seed} className="App-seed" />
        </div>
      </div>
    );
  }
}

export default App;
