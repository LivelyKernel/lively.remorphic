// Model == string

export function view(name = "") {
  return lively.BuildSpec({
    "class": "lively.morphic.Text",
    "textString": name
  });
}
