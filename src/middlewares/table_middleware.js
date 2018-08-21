export default store => next => action => {
  const { table } = store.getState();
  const newSortValues = [...table.sortValues];
  if (action.type === "SORT_TABLE") {
    const keys = Object.keys(table.tableData[0]);
    const newArrowValues = [],
      index = action.columnIndex;
    for (let i = 0; i < keys.length; i++) {
      newArrowValues.push(i === index);
    }
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
  } else if (action.type === "CREATE_TABLE") {
    const keys = Object.keys(action.tableData[0]);
    for (let i = 0; i < keys.length; i++) {
        newSortValues[i] = (i === table.columnIndex);
    };
  };
  action.sortValues = newSortValues;
  return next(action);
};