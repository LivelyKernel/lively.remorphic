// Model == string

class ButtonPress {}

export const Actions = { ButtonPress };

export function view(name = "") {
  const m = new lively.morphic.Button(lively.rect(0, 0, 60, 20), name);
  m.addScript(function doAction() { this.dispatch(new ButtonPress()); });
  lively.bindings.connect(m, "fire", m, "doAction");
  return m;
}
