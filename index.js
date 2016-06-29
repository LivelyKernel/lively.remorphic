// pure views
import label from './src/label.js';
import hbox from './src/hbox.js';
import vbox from './src/vbox.js';
import win from './src/window.js';

// standard components
import * as button from './src/button.js';
import * as text from './src/text.js';
import * as checkbox from './src/checkbox.js';

export {
  button,
  checkbox,
  label,
  hbox,
  text,
  vbox,
  win
};

// Action base class defaults to storing argument or sub-action

export class Action {
  constructor(arg) { this.arg = arg; }
  perform(model) { }
};

// Morhpic extension
import M from './src/morphic_ext';

export default async function ReMorph(moduleName, model) {
  // expects the module to have a "view" function
  // view : Model -> Morph
  // the Morph returned by the view should dispatch actions to owner
  // if "model" is omitted, instantiate default Model
  // returns a standard Morph for the ReMorphic module
  const m = new lively.morphic.Morph(),
        s = lively.net.SessionTracker.getSession(),
        url = `lively://${s.sessionId.replace(/:/g, "_COLON_")}/${m.id}`;
  m.model = model;
  m.name = m.id;
  m.textString = `
import {Model, view} from '${moduleName}';
const m = $world.getMorphById('${m.id}');
m.model = m.model || new Model();
m.addScript(function dispatch(action) {
  action.perform(this.model);
  this.removeAllMorphs();
  this.addMorph(view(this.model));
}, 'dispatch', {view});
m.addMorph(view(m.model));`;
  $world.addMorph(m);
  await System.import(url);
  $world.removeMorph(m);
  return m;
}
