import tableData from "../data/profiles.json";

export const SAVE_TABLE_ACTION = "SAVE_TABLE_ACTION";

const initialState = {
  table: tableData
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAVE_TABLE_ACTION:
      return { ...state, table: action.table };
    default:
      return state;
  }
}
