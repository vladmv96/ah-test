import { SAVE_TABLE_ACTION } from "../reducers/table";

export function saveTable(table) {
  return { type: SAVE_TABLE_ACTION, table };
}
