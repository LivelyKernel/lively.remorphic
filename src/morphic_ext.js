lively.morphic.Morph.addMethods({
  dispatch: function dispatch(action) {
    return this.owner && this.owner.dispatch(action);
  },
  amap: function amap(ActionConstructor, ...args) {
    this.addScript(function dispatch(action) {
      this.owner && this.owner.dispatch(new ActionConstructor(action, ...args));
    }, 'dispatch', {ActionConstructor, args});
    return this;
  }
});
export const m = 0;