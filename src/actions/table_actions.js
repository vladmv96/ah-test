import { SAVE_COLUMN_INDEX, SAVE_TABLE_DATA, CREATE_SORT_VALUES, EDIT_SORT_DIRECTION, CREATE_ARROW_VALUES, SORT_TABLE } from "../reducers/table";

export function saveColumnIndex(columnIndex) {
  return { type: SAVE_COLUMN_INDEX, columnIndex};
}

export function saveTableData(tableData) {
  return { type: SAVE_TABLE_DATA, tableData};
}

export function createSortValues() {
  return { type: CREATE_SORT_VALUES, sortValues: [] }
}

export function editSortDirection() {
  return { type: EDIT_SORT_DIRECTION, sortValues: [] }
}

export function createArrowValues() {
  return { type: CREATE_ARROW_VALUES, arrowValues: [] }
}

export function sortTable(value) {
  return { type: SORT_TABLE, data: {value}, tableData: [] }
}