const isValideAction = action => action.type === "CREATE_TABLE";

export default store => next => action => {
  const { table } = store.getState();
  if (isValideAction(action)) {
    const keys = Object.keys(action.tableData[0]);
    const newSortValues = [...table.sortValues];
    for (let i = 0; i < keys.length; i++) {
      if (i !== table.columnIndex) {
        newSortValues[i] = false;
      }
    }
    action.sortValues = newSortValues;
  }
  return next(action);
};