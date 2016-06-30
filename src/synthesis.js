import { arr } from 'lively.lang';

let nextCId = 1;

function findComponents(spec, results = {}) {
  if (spec.moduleName) {
    results[nextCId++] = {module: spec.moduleName, morph: spec};
  }
  return results.concat(arr.flatmap(spec.submorphs, findComponents));
}

function replaceComponents(spec, components = []) {
  if (!spec.submorphs) return components;
  for (let i = 0; i < spec.submorphs.length; i++) {
    if (spec.submorphs.moduleName) {
      components[nextCId] = {module: spec.moduleName, morph: spec};
      spec.submorphs[i] = `c@${nextCId}`;
      nextCId++;
    }
  }
  spec.submorphs.forEach(m => replaceComponents(m, components));
  return components;
}

export function convertToModule(morph) {
  const spec = morph.buildSpec(),
        components = replaceComponents(spec.attributeStore),
        modules = arr.uniq(components.map(c => c.module));
  components.forEach(c => c.mid = modules.indexOf(c.module));
  const moduleImports = modules.map((name, id) =>
    `import * as c${id} from "${name}";\n`).join();
  
  let strSpec = spec.toString()
  components.forEach(({mid}, id) => {
    strSpec = strSpec.replace(`c@${nextCId}`, `c${mid}.view(model.m${id})`);
  });
  
  const modelCreators = components.map(({mid}, id) =>
    `    this.m${id} = new c${mid}.Model();\n`).join();
  
  return `/*** Example Use: ***
import ReMorph from "lively.remorphic";
ReMorph("@module@").openInHand();
***/
  
import { Action } from 'lively.remorphic';
${moduleImports}
  
export class Model {
  constructor() {
${modelCreators}
  }
}

class MyAction extends Action {
  perform(model) {
    // add action logic
  }
}

export const Actions = { MyAction };

export function view(model) {
  return ${strSpec}.createMorph().asViewOf("@module@");
}`;
}
