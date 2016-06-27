// Model == boolean

class ToggleCheck {
  constructor(checked) { this.checked = checked; }
}

export const Actions = { ToggleCheck };

export function view(checked = false) {
  const m = new lively.morphic.CheckBox(checked);
  m.addScript(function doAction(v) { this.dispatch(new ToggleCheck(v)); });
  lively.bindings.connect(m, "checked", m, "doAction");
  return m;
}
