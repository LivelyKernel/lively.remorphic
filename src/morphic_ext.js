import { Action } from "../index.js";
import { convertToModule as convert } from './synthesis.js';

class RefreshView extends Action {}

function subscribe(moduleName, morph) {
  const modules = System.get(System.decanonicalize("lively.modules"));
  modules.subscribe("modulechange", () => {
    morph.dispatch(new RefreshView());
  });
}

lively.morphic.Morph.addMethods({
  openModuleEditorFor: function openModuleEditorFor(moduleName) {
    let moduleEditor = this.get('ModuleEditor');
    if (!moduleEditor) {
      moduleEditor = lively.PartsBin.getPart('ModuleEditor', 'PartsBin/lively.modules');
      moduleEditor.openInWorldCenter();
    }
    moduleEditor.bringToFront();
    moduleEditor.selectModuleName(moduleName);
  }
});

lively.morphic.Morph.addMethods({
  dispatch: function dispatch(action) {
    return this.owner && this.owner.dispatch(action);
  },
  amap: function amap(ActionConstructor, ...args) {
    this.addScript(function dispatch(action) {
      this.owner && this.owner.dispatch(new ActionConstructor(action, ...args));
    }, 'dispatch', {ActionConstructor, args});
    return this;
  },
  asViewOf: function asViewOf(moduleName) {
    this.moduleName = moduleName;
    this.addScript(function getHalos(shiftedActivation) {
      const halos = $super(shiftedActivation),
            oeIdx = halos.findIndex(h =>
              h instanceof lively.morphic.ScriptEditorHalo);
      halos[oeIdx] = Object.create(halos[oeIdx]);
      halos[oeIdx].clickAction = () => {
        this.removeHalos();
        $world.openModuleEditorFor(this.moduleName);
      };
      return halos;
    });
    subscribe(moduleName, this);
    return this;
  },
  convertToModule: function convertToModule() {
    const src = convert(this);
    let moduleEditor = this.get('ModuleEditor');
    if (!moduleEditor) {
      moduleEditor = lively.PartsBin.getPart('ModuleEditor', 'PartsBin/lively.modules');
      moduleEditor.openInWorldCenter();
    }
    moduleEditor.bringToFront();
    moduleEditor.addModule(src);
  }
});

export const m = 0;
