// Model == Array<Components>

export function view(components = []) {
  return lively.BuildSpec({
    "class": "lively.morphic.Morph",
    "layouter": "lively.morphic.layout.VerticalLayout",
    "submorphs": components
  });
}
