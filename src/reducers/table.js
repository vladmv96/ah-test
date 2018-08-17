export const SAVE_SORT_VALUES_ACTION = "SAVE_SORT_VALUES_ACTION";
export const SAVE_ARROW_VALUES_ACTION = "SAVE_ARROW_VALUES_ACTION";
export const SAVE_COLUMN_INDEX_ACTION = "SAVE_COLUMN_INDEX_ACTION";

const initialState = {
  sortValues: [],
  arrowValues: [],
  columnIndex: -1,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_SORT_VALUES_ACTION:
      return { ...state, sortValues: action.sortValues };
    case SAVE_ARROW_VALUES_ACTION:
      return { ...state, arrowValues: action.arrowValues };
      case SAVE_COLUMN_INDEX_ACTION:
        return { ...state, columnIndex: action.columnIndex };
    default:
      return state;
  }
}
