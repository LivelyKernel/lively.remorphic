// Model == string

class TextChange {
  constructor(str) { this.str = str; }
}

export const Actions = { TextChange };

export function view(name = "") {
  return lively.BuildSpec({
    "class": "lively.morphic.Text",
    "textString": name,
    "subscriptions": {
      "onChange": evt => new TextChange(evt)
    }
  });
}
