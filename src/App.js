import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { todoItem } from './Store';

@observer
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   // Error: [mobx-state-tree] Cannot modify 'Todo@<root>', the object is protected and can only be modified by using an action.
  //   todoItem.done = !todoItem.done;
  // }

  render() {
    return (
      <Card style={{ width: 600, margin: "auto" }}>
        <CardContent>
          <Typography variant={'headline'}>
            {todoItem.asMarkdonw}
          </Typography>
          <Button
            onClick={() => todoItem.toggle()}
            variant="raised"
            color="primary"
          >
            Toggle
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export default App;
