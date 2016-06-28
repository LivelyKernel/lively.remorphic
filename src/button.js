import { Action } from '../index.js';

// Model == string

class ButtonPress extends Action {}
export const Actions = { ButtonPress };

export function view(name = "") {
  const ButtonPress = Actions.ButtonPress; //FIXME b/c of addScript
  const m = new lively.morphic.Button(lively.rect(0, 0, 40, 20), name);
  m.addScript(function doAction() {
    this.dispatch(new ButtonPress());
  }, 'doAction', {ButtonPress});
  lively.bindings.connect(m, "fire", m, "doAction");
  return m;
}
