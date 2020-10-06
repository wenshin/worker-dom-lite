import React, { Component } from 'react';
// import { Tooltip } from 'antd';
// import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import WorkerDemo from './WorkerDemo';

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
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
          <WorkerDemo name={this.state.name} />
          {/* <Tooltip title="prompt text">
            <span>Tooltip will show on mouse enter.</span>
          </Tooltip> */}
        </header>
      </div>
    );
  }
}

export default App;
