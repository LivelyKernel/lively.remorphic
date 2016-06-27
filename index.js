import { obj, fun } from 'lively.lang';

import * as button from './src/button.js';
import * as label from './src/label.js';
import * as text from './src/text.js';
import * as hbox from './src/hbox.js';
import * as vbox from './src/vbox.js';
import * as checkbox from './src/checkbox.js';

function amap(buildSpec, ActionConstructor) {
  return obj.deepMerge(buildSpec, {
    subscriptions: {
      transform: action => new ActionConstructor(action)
    }
  });
}

function installHandlers(buildSpec, dispatch) {
  const subs = buildSpec.subscriptions,
        transform = subs && subs.transform || (x => x);
  for (let k of (subs ? Object.keys(subs) : [])) {
    buildSpec[k] = function(evt) {
      dispatch(transform(subs[k](evt)));
    };
  }
  buildSpec.submorphs.forEach(m => installHandlers(m, dispatch));
}

function driver(model, update, view) {
  let buildSpec = view(model);
  installHandlers(buildSpec, act => {
    return act;
  });
}

export {
  button,
  label,
  checkbox,
  hbox,
  vbox
};
