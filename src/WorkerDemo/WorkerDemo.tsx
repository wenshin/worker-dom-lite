import React, { MouseEvent } from 'react';

export interface WorkerDemoProps {
  name: string;
}

export default class WorkerDemo extends React.Component<WorkerDemoProps> {
  handleClick = (evt: MouseEvent) => {
    console.log('WorkerDemo click', evt);
  };

  render() {
    const { name } = this.props;
    return (
      <div className="worker-demo" onClick={this.handleClick}>
        Hello {name}!
      </div>
    );
  }
}
