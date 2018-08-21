export const CREATE_TABLE = "CREATE_TABLE";
export const SORT_TABLE = "SORT_TABLE";

const initialState = {
  sortValues: [],
  arrowValues: [],
  columnIndex: -1,
  tableData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return { ...state, sortValues: action.sortValues, tableData: action.tableData };
    case SORT_TABLE:
        return { ...state, tableData: action.tableData, arrowValues: action.arrowValues, sortValues: action.sortValues, columnIndex: action.columnIndex };
    default:
      return state;
  }
}
