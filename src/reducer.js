export const INITIAL_STATE = {
  x: 0,
  y: 0
};

function randomize (state) {
  return Object.assign({}, state, {
    x: Math.random() * 1000,
    y: Math.random() * 1000
  });
}

export const reducer = function(state, action) {
  switch (action.type) {
  case 'RANDOMIZE':
    return randomize(state);
  default:
    return INITIAL_STATE;
  }
};