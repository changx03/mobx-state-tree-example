import { autorun, configure } from 'mobx';
import { types } from 'mobx-state-tree';

configure({
  enforceActions: "strict",
});

const Todo = types.model('Todo', {
  title: types.string,
  done: false,
});

export const todoItem = Todo.create({
  title: 'Read a book',
  done: false,
});

autorun(() => {
  console.log(`${todoItem.title}: ${todoItem.done}`);
});