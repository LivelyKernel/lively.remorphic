// Model == string

class ButtonPress {}

export const Actions = { ButtonPress };

export function view(name = "") {
  return lively.BuildSpec({
    "class": "lively.morphic.Button",
    "label": name,
    "subscriptions": {
      "onClick": evt => new ButtonPress()
    }
  });
}
