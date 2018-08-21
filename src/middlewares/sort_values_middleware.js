const isValideAction = action => action.type;

export default store => next => action => {

  const { table } = store.getState();
  
  if (isValideAction(action) === "CREATE_SORT_VALUES") {
    const keys = Object.keys(table.tableData[0]);
    const newSortValues = [...table.sortValues];
    for (let i = 0; i < keys.length; i++) {
      if (i !== table.columnIndex) {
        newSortValues[i] = false;
      }
    }
    action.sortValues = newSortValues;
  } else if (isValideAction(action) === "EDIT_SORT_DIRECTION") {
    const index = table.columnIndex;
    const newValue = !table.sortValues[index];
    const newSortValues = [...table.sortValues];
    newSortValues[index] = newValue;
    action.sortValues = newSortValues;
  }

  return next(action);
};
