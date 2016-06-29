// Model == Array<Morph>

export default function view(submorphs = []) {
  const m = new lively.morphic.Morph();
  m.applyStyle({resizeWidth: true, resizeHeight: true});
  m.setLayouter({type: 'horizontal'});
  m.setExtent(lively.pt(200, 20));
  submorphs.reverse().forEach(sm => m.addMorph(sm));
  m.adjustForNewBounds();
  return m;
}
