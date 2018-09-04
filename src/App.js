import React, { Component } from 'react';
import { todoItem } from './Store';

class App extends Component {
  constructor(props) {
    super(props);

    todoItem.done = !todoItem.done;
  }

  render() {
    return (
      <div className="App">
        <div>{todoItem.title}</div>
      </div>
    );
  }
}

export default App;
