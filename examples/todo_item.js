// Example Use:
//
// import ReMorph from "lively.remorphic";
// const m = await ReMorph("lively.remorphic/examples/todo_item.js");
// m.openInHand();

import { Action, button, text, checkbox, hbox } from '../index.js';

export class Model {
  constructor(name = "", done = false) {
    this.name = name;
    this.done = done;
  }
}

class ToggleDone extends Action {
  perform(model) {
    model.done = this.arg.checked;
  }
}
class Rename extends Action {
  perform(model) {
    model.name = this.arg.str;
  }
}
class Remove extends Action {}

export const Actions = { ToggleDone, Rename, Remove };

export function view(model, dispatch) {
  return hbox([
    checkbox.view(model.done).amap(ToggleDone),
    text.view(model.name).amap(Rename),
    button.view("×").amap(Remove)
  ]);
}
