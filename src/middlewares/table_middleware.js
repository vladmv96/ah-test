export default store => next => action => {
  const { table } = store.getState();
  if (action.type === "SORT_TABLE") {
    let newSortValue = false;
    if (table.columnIndex === action.columnIndex) {
      newSortValue = !table.sortValue;
    } 
    const key = Object.keys(table.tableData[0])[action.columnIndex];
    const newTable = [...table.tableData].sort(function(obj1, obj2) {
      return (
        (newSortValue
          ? obj1[key].toUpperCase() < obj2[key].toUpperCase()
          : obj1[key].toUpperCase() > obj2[key].toUpperCase())*2 - 1
      );
    });
    action.tableData = newTable;
    action.sortValue = newSortValue;
  } 
  return next(action);
};