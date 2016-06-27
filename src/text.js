// Model == string

class TextChange {
  constructor(str) { this.str = str; }
}

export const Actions = { TextChange };

export function view(name = "") {
  const m = new lively.morphic.Text(lively.rect(0, 0, 120, 20), name);
  m.setFill(lively.Color.white);
  m.addScript(function doAction(v) { this.dispatch(new TextChange(v)); });
  lively.bindings.connect(m, "textString", m, "doAction");
  return m;
}
