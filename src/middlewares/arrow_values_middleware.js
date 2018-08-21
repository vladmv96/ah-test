const isValideAction = action => action.type === "CREATE_ARROW_VALUES";

export default store => next => action => {
  
const {table} = store.getState();

  if (isValideAction(action)) {
    const arrows = [];
    const keys = Object.keys(table.tableData[0]);
    for (let i = 0; i < keys.length; i++) {
      if (i === table.columnIndex) {
        arrows.push(true);
      } else {
        arrows.push(false);
      }
    }

    action.arrowValues = arrows;
  }

  return next(action);
};