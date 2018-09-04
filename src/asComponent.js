import React from 'react';

export function asComponent(fn) {
  return class ReactComponent extends React.Component {
    render() {
      return fn() || null;
    }
  }
}
