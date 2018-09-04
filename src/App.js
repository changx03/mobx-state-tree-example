import React, { Component } from 'react';
import { todoItem } from './Store';

class App extends Component {
  constructor(props) {
    super(props);

    // Error: [mobx-state-tree] Cannot modify 'Todo@<root>', the object is protected and can only be modified by using an action.
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
