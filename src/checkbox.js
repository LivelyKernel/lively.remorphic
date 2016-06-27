// Model == boolean

class ToggleCheck {}

export const Actions = { ToggleCheck };

export function view(checked = false) {
  return lively.BuildSpec({
    "class": "lively.morphic.CheckBox",
    "onChange": (dispatch) => dispatch(new ToggleCheck())
  });
}
