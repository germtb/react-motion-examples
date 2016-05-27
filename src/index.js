import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/style.css';
import {Motion, spring} from 'react-motion';

const Slide = props => {
  const defaultStyle = {};
  defaultStyle[props.direction] = props.origin;
  const endStyle = {};
  endStyle[props.direction] = spring(props.end);
  return (
    <Motion className={props.className} defaultStyle={defaultStyle} style={endStyle}>
      {interpolatingStyle =>
        <div className='Slide' style={Object.assign({}, props.style, interpolatingStyle)}>
          {props.children}
        </div>
      }
    </Motion>
  );
};

const Fade = props => {
  const defaultStyle = {
    opacity: props.origin
  };
  const endStyle = {
    opacity: spring(props.end)
  };
  return (
    <Motion defaultStyle={defaultStyle} style={endStyle}>
      {interpolatingStyle =>
        <div style={Object.assign(props.style, interpolatingStyle)}>
          {props.children}
        </div>
      }
    </Motion>
  );
};

ReactDOM.render(
  (<div>
    <Slide origin={500} end={0} direction={'left'} style={'Slide'}>
      <p > Hello slide left </p>
    </Slide>
    <Slide origin={500} end={0} direction={'top'} style={'Slide'}>
      <p > Hello slide top </p>
    </Slide>
    <Slide origin={500} end={0} direction={'right'} style={'Slide'}>
      <p > Hello slide right </p>
    </Slide>
    <Fade origin={0} end={1} style={'Fade'}>
      <p > Hello fade in </p>
    </Fade>
    <Fade origin={1} end={0.1} style={'Fade'}>
      <p > Hello fade out </p>
    </Fade>
    <Fade origin={0} end={1} style={'Fade'}>
      <Slide origin={500} end={0} direction={'left'} style={'Slide'}>
        <p > Hello fade slide </p>
      </Slide>
    </Fade>
    <Fade origin={0} end={1} style={'Fade'}>
      <Slide origin={500} end={0} direction={'left'} style={'Slide'}>
        <Slide origin={500} end={0} direction={'bottom'} style={'Slide'}>
          <p > Hello fancy animation </p>
        </Slide>
      </Slide>
    </Fade>
  </div>),
  document.getElementById('app')
);
