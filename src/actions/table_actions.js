import { CREATE_TABLE, SORT_TABLE } from "../reducers/table";

export function createTable(tableData) {
  return { type: CREATE_TABLE, sortValues: [], tableData }
}

export function sortTable(columnIndex) {
  return { type: SORT_TABLE, tableData: [], arrowValues: [], sortValues: [], columnIndex }
}