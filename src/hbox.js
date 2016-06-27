// Model == Array<Components>

export function view(components = []) {
  const m = new lively.morphic.Morph();
  m.setLayouter({type: 'horizontal'});
  return m;
}
