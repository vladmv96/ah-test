import { CREATE_TABLE, SORT_TABLE } from "../reducers/table";

export function createTable(tableData) {
  return { type: CREATE_TABLE, tableData }
}

export function sortTable(columnIndex) {
  return { type: SORT_TABLE, tableData: [], sortValue: false, columnIndex }
}