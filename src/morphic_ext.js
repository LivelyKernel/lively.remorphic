lively.morphic.Morph.addMethods({
  dispatch: function dispatch(action) {
    return this.owner && this.owner.dispatch(action);
  },
  amap: function amap(ActionConstructor, ...args) {
    const m = new lively.morphic.Morph();
    m.addMorph(this);
    m.addScript(function dispatch(action) {
      this.owner && this.owner.dispatch(new ActionConstructor(action, ...args));
    }, 'dispatch', {ActionConstructor, args});
    return m;
  }
});