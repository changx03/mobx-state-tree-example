import { autorun, configure } from 'mobx';
import { types, getRoot } from 'mobx-state-tree';

configure({
  enforceActions: 'always',
});

// User --(1 to many)--> Todo 
const Todo = types
  .model('Todo', {
    assignee: types.string, // represents a User
    title: types.string,
    done: false,
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    },
    setAssignee(user) {
      if (typeof user === 'string') this.assignee = user;
      else if (User.is(user)) this.assignee = user.userId;
      else throw new Error('Not a valid user object or user id!');
    },
  }))
  .views(self => ({
    get asMarkdonw() {
      return self.done ? `* [x] ~~${self.title}~~` : `* [ ] ${self.title}`;
    },
    contains(text) {
      return self.title.indexOf(text) !== -1;
    },
    getAssignee() {
      if (!this.assignee) return undefined;
      return getRoot(self).users.get(this.assignee);
    },
  }));

export const todoItem = Todo.create({
  title: 'Read a book',
  done: false,
});

autorun(() => {
  console.log(`${todoItem.title}: ${todoItem.done}`);
});

// fine-tuning primitive types
const User = types.model('User', {
  userId: types.string, // uniquely identifier
  name: types.string,
  age: 42,
  twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))), // not a empty string
});

const RootModel = types.model('App', {
  todos: types.array(Todo),
  users: types.map(User),
});

export const rootModel = RootModel.create({
  todos: [
    { title: 'Write the chapter', done: false },
    { title: 'Review the chapter', done: false },
  ],
  users: {
    michel: {
      name: 'Michel Westrate',
      twitter: 'mwestrate',
    },
    pavan: {
      name: 'Pavan Podila',
      twitter: 'pavanpodila',
    },
  },
});

rootModel.todos[0].toggle();
