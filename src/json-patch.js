import { Typography } from '@material-ui/core';
import { onPatch, types } from 'mobx-state-tree';
import React from 'react';
import { asComponent } from './asComponent';

const Todo = types
  .model('Todo', {
    title: types.string,
    done: false,
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    },
  }))
  .views(self => ({
    get asMarkdown() {
      return self.done ? `* [x] ~~${self.title}~~` : `* [ ] ${self.title}`;
    },

    contains(text) {
      return self.title.indexOf(text) !== -1;
    },
  }));

const User = types.model('User', {
  name: types.string,
  age: 42,
  twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))),
});

const App = types.model('App', {
  todos: types.array(Todo),
  users: types.map(User),
});

const app = App.create({
  todos: [
    {
      title: 'Learn MST',
      done: false,
      assignee: '37',
    },
  ],
  users: {
    '37': {
      userid: '37',
      name: 'Michel Weststrate',
      age: 33,
      twitter: 'mweststrate',
    },
  },
});

export const AsPatchComponent = asComponent(() => {
  onPatch(app, (patches, inversePatches) => {
    console.dir(patches, inversePatches);
  });

  app.todos[0].toggle();

  return (
    <Typography variant={'subheading'}>
      Check your console.
    </Typography>
  );
});
