import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tooltip } from 'antd';
import Popup from './react-worker/worker/react/Popup';
import 'antd/dist/antd.css';

class App extends Component<unknown, { name: string }> {
  state: { name: string } = {
    name: 'ywx'
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p
            onClick={() => {
              console.log('host click');
              this.setState({ name: this.state.name === 'ywx' ? 'wenshin' : 'ywx' });
            }}
          >
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Popup
            align={{
              points: [ 'bc', 'tc' ]
            }}
            renderPopup={({ ref }) => {
              return (
                <span
                  ref={ref}
                  style={{
                    background: '#0ff'
                  }}
                >
                  Ha ha
                </span>
              );
            }}
          >
            {({ ref, open, close }) => {
              return (
                <button
                  ref={ref}
                  onMouseEnter={() => {
                    open();
                  }}
                  onMouseLeave={() => {
                    close();
                  }}
                >
                  Custom Popup
                </button>
              );
            }}
          </Popup>
          <Tooltip title="prompt text">
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </Tooltip>
        </header>
      </div>
    );
  }
}

export default App;
