import { Action } from '../index.js';

// Model == string

class TextChange extends Action {
  constructor(str) { this.str = str; }
}
export const Actions = { TextChange };

export function view(name = "text") {
  const TextChange = Actions.TextChange; //FIXME b/c of addScript
  const m = new lively.morphic.Text(lively.rect(0, 0, 120, 20), name);
  m.applyStyle({resizeWidth: true, resizeHeight: false});
  m.setFill(lively.Color.white);
  m.addScript(function doAction(str) {
    this.dispatch(new TextChange(str));
  }, 'doAction', {TextChange});
  lively.bindings.connect(m, "textString", m, "doAction");
  return m.asViewOf("lively.remorphic/src/text.js");
}
