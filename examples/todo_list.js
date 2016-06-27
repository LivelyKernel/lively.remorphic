import { button, label, vbox, hbox } from '../index.js';
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

class Add {
  perform(model) { model.todos.push(new todoItem.Model()); }
}
class ItemAction {
  constructor(act, idx) { this.act = act; this.idx = idx; }
  perform(model) {
    this.act.perform(model.todos[this.idx]);
    if (this.act instanceof todoItem.Actions.Remove) {
      model.todos = model.todos.filter((_, idx) => idx !== this.idx);
    }
  }
}
class RemoveCompleted {
  perform(model) {
    model.todos = model.todos.filter(t => !t.done);
  }
}
class ShowAll {
  perform(model) { model.show = "all"; }
}
class ShowActive {
  perform(model) { model.show = "active"; }
}
class ShowCompleted {
  perform(model) { model.show = "completed"; }
}

export const Actions = { Add, ItemAction, RemoveCompleted,
                         ShowAll, ShowActive, ShowCompleted };

export function view(model, dispatch) {
  const items = model.visibleTodos().map((todo, idx) =>
    todoItem.view(todo).amap(ItemAction, idx));
  const panel = [
    label(`${model.left()} items left`),
    button("Add Item").amap(Add),
    button("All").amap(ShowAll),
    button("Active").amap(ShowActive),
    button("Completed").amap(ShowCompleted)];
  if (model.hasCompleted()) {
    panel.push(button("Clear completed").amap(RemoveCompleted));
  }
  return vbox(items.concat([panel]));
}
