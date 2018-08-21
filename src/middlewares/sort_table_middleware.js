const isValideAction = action => action.type === "SORT_TABLE";

export default store => next => action => {
  const { table } = store.getState();
  if (isValideAction(action)) {
    const newArrowValues = [],
      index = action.columnIndex,
      keys = Object.keys(table.tableData[0]);
    for (let i = 0; i < keys.length; i++) {
      i === index ? newArrowValues.push(true) : newArrowValues.push(false);
    }
    const newSortValues = [...table.sortValues];
    newSortValues[index] = !table.sortValues[index];
    const key = keys[index];
    const newTable = [...table.tableData].sort(function(obj1, obj2) {
      if (
        table.sortValues[index]
          ? obj1[key].toUpperCase() > obj2[key].toUpperCase()
          : obj1[key].toUpperCase() < obj2[key].toUpperCase()
      )
        return -1;
      else return 1;
    });
    action.arrowValues = newArrowValues;
    action.tableData = newTable;
    action.sortValues = newSortValues;
  }
  return next(action);
};
