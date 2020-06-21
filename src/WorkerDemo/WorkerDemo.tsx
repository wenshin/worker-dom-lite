import React, { MouseEvent, ChangeEvent } from 'react';
import './index.css';

export interface WorkerDemoProps {
  name: string;
}

export default class WorkerDemo extends React.Component<WorkerDemoProps, { name: string }> {
  state = {
    name: ''
  };
  handleClick = (evt: MouseEvent) => {
    console.log('WorkerDemo click', evt);
  };

  handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log('WorkerDemo change', evt.target);
    this.setState({
      name: evt.target.value
    });
  };

  render() {
    const { name } = this.props;
    const { name: stateName } = this.state;
    return (
      <div className="worker-demo" style={{ color: '#61dafb' }} onClick={this.handleClick}>
        <h1>Hello World</h1>
        <input placeholder="Input Your Name!" value={stateName} onChange={this.handleChange} />
        <p>Hello {stateName || name}!</p>
      </div>
    );
  }
}
