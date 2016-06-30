// Model == Morph

export function view(title, morph) {
  const m = new lively.morphic.Window(morph, title);
  m.setExtent(lively.pt(320, 120));
  m.applyLayout();
  return m.asViewOf("lively.remorphic/src/window.js");
}
