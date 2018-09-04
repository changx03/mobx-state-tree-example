import { autorun, configure } from 'mobx';
import { getRoot, types } from 'mobx-state-tree';

configure({
  enforceActions: 'always',
});

// fine-tuning primitive types
const User = types.model('User', {
  // userId: types.string, // uniquely identifier
  userId: types.identifier,
  name: types.string,
  age: 42,
  twitter: types.maybe(types.refinement(types.string, v => /^\w+$/.test(v))), // not a empty string
});

// User --(one-to-many)--> Todo
const Todo = types
  .model('Todo', {
    // assignee: types.string, // represents a User
    assignee: types.maybe(types.reference(User)),
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
  // assignee: '1',
  title: 'Read a book',
  done: false,
});

autorun(() => {
  console.log(`${todoItem.title}: ${todoItem.done}`);
});

const RootModel = types.model('App', {
  todos: types.array(Todo),
  users: types.map(User),
});

export const rootModel = RootModel.create({
  todos: [
    { title: 'Write the chapter', done: false, assignee: '1' },
    { title: 'Review the chapter', done: false, assignee: '1' },
  ],
  users: {
    michel: {
      userId: '1',
      name: 'Michel Westrate',
      twitter: 'mwestrate',
    },
    pavan: {
      userId: '2',
      name: 'Pavan Podila',
      twitter: 'pavanpodila',
    },
  },
});

rootModel.todos[0].toggle();

console.log(rootModel.todos[1].assignee.name);
