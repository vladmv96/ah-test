import React, { Component } from "react";
import "../styles/Table.css";
import { connect } from "react-redux";
import { saveTable } from "../actions/table_actions";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableKeys: [],
      sortValues: []
    };
  }

  componentWillMount = () => {
    let tableKeys = Object.keys(this.props.table[0]);
    this.createSortValues(tableKeys);
    this.setState({ tableKeys });
  };

  createSortValues = keys => {
    for ( let i; i < keys.lenght; i++) {
      this.state.sortValues.push(false);
    }
  };

  editSortValues = index => {
    let newValue = !this.state.sortValues[index];
    let newSortValues = this.state.sortValues;
    newSortValues[index] = newValue;
    this.setState({ sortValues: newSortValues });
  };

  renderTableHeader = (item, index) => {
    return (
      <th key={index} onClick={this.sortTable.bind(this, index)}>
        {item}
      </th>
    );
  };

  renderTableBody = (list, index) => {
    return (
      <tr key={index * 9}>
        {this.state.tableKeys.map(this.renderTableItem.bind(this, list))}
      </tr>
    );
  };

  renderTableItem = (list, item, index) => {
    return <td key={index * 17}> {list[item]} </td>;
  };

  sortTable = index => {
    this.editSortValues(index);
    let key = this.state.tableKeys[index];
    let newTable;
    if (this.state.sortValues[index]) {
      newTable = this.props.table.slice().sort(function(obj1, obj2) {
        if (obj1[key].toUpperCase() < obj2[key].toUpperCase()) return -1;
        else return 1;
      });
    } else {
      newTable = this.props.table.slice().sort(function(obj1, obj2) {
        if (obj2[key].toUpperCase() < obj1[key].toUpperCase()) return -1;
        else return 1;
      });
    }
    this.props.saveTable(newTable);
  };

  render() {
    return (
      <div className="Table">
        <table>
          <thead>
            <tr>{this.state.tableKeys.map(this.renderTableHeader)}</tr>
          </thead>
          <tbody>{this.props.table.map(this.renderTableBody)}</tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = {
  saveTable
};

const mapStateToProps = state => ({
  table: state.table.table
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
