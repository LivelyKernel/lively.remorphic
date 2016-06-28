// Model == string

export default function view(name = "") {
  const m = new lively.morphic.Text(lively.rect(0, 0, 120, 20), name);
  m.beLabel();
  m.applyStyle({resizeWidth: true});
  return m;
}
