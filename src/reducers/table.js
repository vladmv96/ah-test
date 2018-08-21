export const CREATE_TABLE = "CREATE_TABLE";
export const SORT_TABLE = "SORT_TABLE";

const initialState = {
  sortValue: false,
  columnIndex: -1,
  tableData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_TABLE:
      return { ...state, sortValue: action.sortValue, tableData: action.tableData };
    case SORT_TABLE:
        return { ...state, tableData: action.tableData, sortValue: action.sortValue, columnIndex: action.columnIndex };
    default:
      return state;
  }
}
