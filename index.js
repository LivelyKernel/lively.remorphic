import { obj, fun } from 'lively.lang';

import * as button from './src/button.js';
import * as label from './src/label.js';
import * as text from './src/text.js';
import * as hbox from './src/hbox.js';
import * as vbox from './src/vbox.js';
import * as checkbox from './src/checkbox.js';

function ReMorph(model, moduleId) {
  // expects the module to have a "view" function
  // model : Model
  // view : Model -> Morph
  // the returned Morph should dispatch actions to owner morph
  const m = new lively.morphic.Morph();
  m.model = model;
  System.import(moduleId).then(({view}) => {
    m.addScript(function dispatch(action) {
      this.model = action.perform(this.model);
      this.removeAllMorphs();
      this.addMorph(view(this.model));
    })
  });
}

export {
  button,
  label,
  checkbox,
  hbox,
  vbox,
  ReMorph
};
