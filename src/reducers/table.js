export const SAVE_ARROW_VALUES = "SAVE_ARROW_VALUES";
export const SAVE_COLUMN_INDEX = "SAVE_COLUMN_INDEX";
export const SAVE_TABLE_DATA = "SAVE_TABLE_DATA";
export const CREATE_SORT_VALUES = "CREATE_SORT_VALUES";
export const EDIT_SORT_DIRECTION = "EDIT_SORT_DIRECTION";
export const CREATE_ARROW_VALUES = "CREATE_ARROW_VALUES";
export const SORT_TABLE = "SORT_TABLE";

const initialState = {
  sortValues: [],
  arrowValues: [],
  columnIndex: -1,
  tableData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_ARROW_VALUES:
      return { ...state, arrowValues: action.arrowValues };
    case SAVE_COLUMN_INDEX:
      return { ...state, columnIndex: action.columnIndex };
    case SAVE_TABLE_DATA:
      return { ...state, tableData: action.tableData };
    case CREATE_SORT_VALUES:
      return { ...state, sortValues: action.sortValues };
    case EDIT_SORT_DIRECTION:
        return { ...state, sortValues: action.sortValues };
    case CREATE_ARROW_VALUES:
        return { ...state, arrowValues: action.arrowValues };
    case SORT_TABLE:
        return { ...state, tableData: action.tableData };
    default:
      return state;
  }
}
