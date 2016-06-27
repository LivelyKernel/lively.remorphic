import { button, text, checkbox, hbox } from '../index.js';

export class Model {
  constructor(name = "", done = false) {
    this.name = name;
    this.done = done;
  }
}

class ToggleDone {
  perform(model) {
    model.done = !model.done;
  }
}
class Rename {
  constructor(textAction) { this.str = textAction.str; }
  perform(model) {
    model.name = this.str;
  }
}
class Remove {}

export const Actions = { ToggleDone, Rename, Remove };

export function view(model, dispatch) {
  return hbox([
    checkbox.view(model.done).amap(ToggleDone),
    text(model.name).amap(Rename),
    button("×").amap(Remove)
  ]);
}
