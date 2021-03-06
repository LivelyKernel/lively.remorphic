import { Action } from '../index.js';

// Model == boolean

class ToggleCheck extends Action {
  constructor(checked) { this.checked = checked; }
}
export const Actions = { ToggleCheck };

export function view(checked = false) {
  const ToggleCheck = Actions.ToggleCheck; //FIXME b/c of addScript
  const m = new lively.morphic.CheckBox(checked);
  m.setExtent(lively.pt(16, 16));
  m.addScript(function doAction(checked) {
    this.dispatch(new ToggleCheck(checked));
  }, 'doAction', {ToggleCheck});
  lively.bindings.connect(m, "checked", m, "doAction");
  return m.asViewOf("lively.remorphic/src/checkbox.js");
}
