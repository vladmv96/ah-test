const isValideAction = (action) => action.type === 'SORT_TABLE';

export default store => next => action => {
    if ( isValideAction(action) ) {
        const { table } = store.getState();
        const value = action.data.value;
        const index = table.columnIndex;
        const key = Object.keys(table.tableData[0])[index];
        let newTable;

        newTable = [...table.tableData].sort(function(obj1, obj2) {
            if (
              value
                ? obj1[key].toUpperCase() < obj2[key].toUpperCase()
                : obj1[key].toUpperCase() > obj2[key].toUpperCase()
            )
              return -1;
            else return 1;
          });

          action.tableData = newTable;
    }

    return next(action);
}