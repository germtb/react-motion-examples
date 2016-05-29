import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../styles/style.css';
import {Motion, spring} from 'react-motion';
import {reducer} from './reducer';
import {createStore} from 'redux';
export const store = createStore(reducer);
import {connect} from 'react-redux';

import {colorInterpolation} from 'color-interpolator';

const Slide = props => {
  const defaultStyle = {};
  defaultStyle[props.direction] = props.origin;
  const endStyle = {};
  endStyle[props.direction] = spring(props.end);
  return (
    <Motion className={props.className} defaultStyle={defaultStyle} style={endStyle}>
      {interpolatingStyle =>
        <div className='Slide'
             style={Object.assign({}, props.style, interpolatingStyle)}>
          {props.children}
        </div>
      }
    </Motion>
  );
};

const SlideColor = props => {
  const defaultStyle = {
    colorInterpolation: 0
  };
  const endStyle = {
    colorInterpolation: spring(1)
  };
  return (
    <Motion defaultStyle={defaultStyle} style={endStyle}>
      {t => {

          const color = colorInterpolation(props.origin, props.end, t.colorInterpolation);
          console.log(t.colorInterpolation);
          return (
          <div style={Object.assign({}, props.style, {color: color})}>
            {props.children}
          </div>);
        }
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
        <div style={{}, Object.assign(props.style, interpolatingStyle)}>
          {props.children}
        </div>
      }
    </Motion>
  );
};

const StatefulSlide = props => {
  const defaultStyle = {
    left: 0,
    bottom: 0
  };
  const endStyle = {
    left: spring(props.x),
    bottom: spring(props.y)
  };
  return (
    <Motion className={props.className} defaultStyle={defaultStyle} style={endStyle}>
      {interpolatingStyle =>
        <div className='Slide'
             style={Object.assign({}, props.style, interpolatingStyle)}>
          {props.children}
        </div>
      }
    </Motion>
  );
}

const StatefulSlideContainer = connect(s => {
  return s === undefined ? {x: 0, y: 0} : {x: s.x, y: s.y};
})(StatefulSlide);

class AnimatedButton extends React.Component{
  constructor(props) {
    super(props)
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.state = {hover: false};
  }
  onMouseOver () {
    this.setState({hover: true});
  }
  onMouseOut() {
    this.setState({hover: false});
  }
  render() {
    const defaultStyle = {
      opacity: 1.0,
      borderRadius: 10
    };
    const endStyle = {
      opacity: this.state.hover ?
        spring(0.6, {stiffness: 200, damping: 20}) :
        spring(0.9, {stiffness: 200, damping: 20}),
      borderRadius: this.state.hover ?
        spring(40, {stiffness: 200, damping: 20}) :
        spring(10, {stiffness: 200, damping: 20})
    };
    return (
      <Motion defaultStyle={defaultStyle} style={endStyle}>
        {interpolatingStyle =>
          <button style={{}, Object.assign({}, this.props.style, interpolatingStyle)}
                  onClick={this.props.onClick}
                  onMouseOver={this.onMouseOver}
                  onMouseOut={this.onMouseOut}>
            {this.props.children}
          </button>
        }
      </Motion>
    );
  }
}

ReactDOM.render(
  (<Provider store={store}>
    <div>
      <Slide origin={500} end={0} direction={'left'}>
        <p> Hello slide left </p>
      </Slide>
      <Slide origin={500} end={0} direction={'top'}>
        <p> Hello slide top </p>
      </Slide>
      <Slide origin={500} end={0} direction={'right'}>
        <p> Hello slide right </p>
      </Slide>
      <SlideColor origin='#AAff00' end='#ff00AA'>
        <p> Hello slide color </p>
      </SlideColor>
      <Fade origin={0} end={1} style={'Fade'}>
        <p> Hello fade in </p>
      </Fade>
      <Fade origin={1} end={0.1} style={'Fade'}>
        <p> Hello fade out </p>
      </Fade>
      <Fade origin={0} end={1} style={'Fade'}>
        <Slide origin={500} end={0} direction={'left'}>
          <p> Hello fade slide </p>
        </Slide>
      </Fade>
      <Fade origin={0} end={1} style={'Fade'}>
        <Slide origin={500} end={0} direction={'left'}>
          <Slide origin={500} end={0} direction={'bottom'}>
            <p> Hello compound animation </p>
          </Slide>
        </Slide>
      </Fade>
      <StatefulSlideContainer>
        <p> Hello redux-connected animation </p>
      </StatefulSlideContainer>
      <AnimatedButton>
        <p style={{opacity: 1}}> Animated button </p>
      </AnimatedButton>
    </div>
  </Provider>),
  document.getElementById('app')
);

window.setInterval(() => store.dispatch({type: 'RANDOMIZE'}) , 1000);
