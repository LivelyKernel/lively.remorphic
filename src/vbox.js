// Model == Array<Morph>

export default function view(submorphs = []) {
  const m = new lively.morphic.Morph();
  m.applyStyle({resizeWidth: true, resizeHeight: true});
  m.setLayouter({type: 'vertical'});
  submorphs.reverse().forEach(sm => m.addMorph(sm));
  m.adjustForNewBounds();
  return m;
}
