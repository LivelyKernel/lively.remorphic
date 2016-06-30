// Model == string

export function view(name = "label") {
  const m = new lively.morphic.Text(lively.rect(0, 0, 120, 20), name);
  m.beLabel();
  m.applyStyle({resizeWidth: true});
  return m.asViewOf("lively.remorphic/src/label.js");
}
