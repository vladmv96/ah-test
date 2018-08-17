import { SAVE_SORT_VALUES_ACTION, SAVE_ARROW_VALUES_ACTION, SAVE_COLUMN_INDEX_ACTION } from "../reducers/table";

export function saveSortValues(sortValues) {
  return { type: SAVE_SORT_VALUES_ACTION, sortValues};
}

export function saveArrowValues(arrowValues) {
  return { type: SAVE_ARROW_VALUES_ACTION, arrowValues};
}

export function saveColumnIndex(columnIndex) {
  return { type: SAVE_COLUMN_INDEX_ACTION, columnIndex};
}