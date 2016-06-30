/*** Example Use: ***
import ReMorph from "lively.remorphic";
ReMorph("lively.remorphic/examples/todo_list.js").openInHand();
***/

import { Action, button, label, vbox, hbox, win } from '../index.js';
import * as todoItem from './todo_item';

export class Model {
  constructor(todos = [], show = "all") {
    this.todos = todos;
    this.show = show;
  }
  visibleTodos() {
    switch (this.show) {
      case "all": return this.todos;
      case "active": return this.todos.filter(t => !t.done);
      case "completed": return this.todos.filter(t => t.done);
    }
  }
  left() {
    return this.todos.filter(t => !t.done).length;
  }
  hasCompleted() {
    return this.todos.any(t => t.done);
  }
}

class Add extends Action {
  perform(model) { model.todos.push(new todoItem.Model()); }
}
class ItemAction extends Action {
  constructor(arg, idx) { super(arg); this.idx = idx; }
  perform(model) {
    this.arg.perform(model.todos[this.idx]);
    if (this.arg instanceof todoItem.Actions.Remove) {
      model.todos = model.todos.filter((_, idx) => idx !== this.idx);
    }
  }
}
class RemoveCompleted extends Action {
  perform(model) {
    model.todos = model.todos.filter(t => !t.done);
  }
}
class ShowAll extends Action {
  perform(model) { model.show = "all"; }
}
class ShowActive extends Action {
  perform(model) { model.show = "active"; }
}
class ShowCompleted extends Action {
  perform(model) { model.show = "completed"; }
}

export const Actions = { Add, ItemAction, RemoveCompleted,
                         ShowAll, ShowActive, ShowCompleted };

export function view(model, dispatch) {
  const items = model.visibleTodos().map((todo, idx) =>
    todoItem.view(todo).amap(ItemAction, idx));
  const panel = [
    label(`${model.left()} items left`),
    button.view("Add").amap(Add),
    button.view("All").amap(ShowAll),
    button.view("Active").amap(ShowActive),
    button.view("Completed").amap(ShowCompleted)];
  if (model.hasCompleted()) {
    panel.push(button.view("Clear completed").amap(RemoveCompleted));
  }
  const m = win("ToDo List", vbox(items.reverse().concat([hbox(panel)])));
  return m.asViewOf("lively.remorphic/examples/todo_list.js");
}
