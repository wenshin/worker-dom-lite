import React, { MouseEvent, ChangeEvent } from 'react';
import Popup from '../worker-dom/worker/react/Popup';
import './index.css';
import { Point } from 'src/worker-dom/host/utils/align';

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
        <Popup
          align={{
            points: [ Point.BC, Point.TC ],
            offset: [],
            targetOffset: [],
            overflow: { adjustX: true, adjustY: true }
          }}
          transition={{
            appear: true,
            timeout: 300
          }}
          renderPopup={({ ref, open, close, transitionStatus }) => {
            const transClass = transitionStatus ? `wd-popup-${transitionStatus}` : '';
            return (
              <span
                ref={ref}
                className={`${transClass} popup-ha-ha`}
                onMouseEnter={() => {
                  open();
                }}
                onMouseLeave={() => {
                  close();
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
                ref={ref as React.MutableRefObject<HTMLButtonElement>}
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
      </div>
    );
  }
}
