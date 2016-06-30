// pure views
import { view as label } from './src/label.js';
import { view as hbox } from './src/hbox.js';
import { view as vbox } from './src/vbox.js';
import { view as win } from './src/window.js';

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

export default function ReMorph(moduleName, model) {
  // expects the module to have a "view" function
  // view : Model -> Morph
  // the Morph returned by the view should dispatch actions to owner
  // if "model" is omitted, instantiate default Model
  // returns a standard Morph for the ReMorphic module
  const m = new lively.morphic.Morph();
  System.normalize(moduleName).then(moduleId => {
    System.import(moduleId).then(({Model, view: v}) => {
      let System; // to prevent rewriting inside of addScript
      m.model = model || Model && new Model();
      m.addScript(function dispatch(action) {
        action.perform(this.model);
        this.removeAllMorphs();
        const {view} = System.get(moduleId);
        this.addMorph(view(this.model));
      }, 'dispatch', {moduleId});
      m.addMorph(v(m.model));
    });
  });
  return m;
}
