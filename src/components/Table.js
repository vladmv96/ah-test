import React, { Component } from "react";
import tableData from "../data/profiles.json";
import "./styles/Table.css";
import { connect } from "react-redux";
import {
  saveSortValues,
  saveArrowValues,
  saveColumnIndex
} from "../actions/table_actions";
import arrow from "./icons/arrow.svg";
import PropTypes from "prop-types";

class Table extends Component {
  constructor(props) {
    super(props);
    const tableKeys = Object.keys(tableData && tableData[0]);
    this.state = {
      table: tableData,
      tableKeys
    };
  }

  counter = 1;

  componentDidMount() {
    const { tableKeys } = this.state;
    const { columnIndex } = this.props;
    this.createSortValues(tableKeys);
    this.createArrowValues(tableKeys, columnIndex);
    if (this.props.columnIndex !== -1) {
      this.loadTable(columnIndex);
    }
  }

  createSortValues(keys) {
    const { sortValues, columnIndex } = this.props;
    const sort = [...sortValues];
    for (let i = 0; i < keys.length; i++) {
      if (i !== columnIndex) {
        sort[i] = false;
      }
    }
    this.props.saveSortValues(sort);
  }

  createArrowValues(keys, index) {
    const arrows = [];
    for (let i = 0; i < keys.length; i++) {
      if (i === index) {
        arrows.push(true);
      } else {
        arrows.push(false);
      }
    }
    this.props.saveArrowValues(arrows);
  }

  editSortDirection(index) {
    const { sortValues } = this.props;
    const newValue = !sortValues[index];
    const newSortValues = [...sortValues];
    newSortValues[index] = newValue;
    this.props.saveSortValues(newSortValues);
  }

  renderTableHeader = (item, index) => {
    this.counter++;
    return (
      <th key={this.counter} onClick={this.sortTable.bind(this, index)}>
        {item}
        {this.props.arrowValues[index] && (
          <img
            src={arrow}
            alt="sort"
            className="arrow"
            style={
              this.props.sortValues[index] ? arrowStyles.up : arrowStyles.down
            }
          />
        )}
      </th>
    );
  };

  renderTableBody = list => {
    this.counter++;
    return (
      <tr key={this.counter}>
        {this.state.tableKeys.map(this.renderTableItem.bind(this, list))}
      </tr>
    );
  };

  renderTableItem(list, item) {
    this.counter++;
    return <td key={this.counter}> {list[item]} </td>;
  }

  sortAction(value, index) {
    const { tableKeys, table } = this.state;
    const key = tableKeys[index];
    let newTable;
    newTable = [...table].sort(function(obj1, obj2) {
      if (
        value
          ? obj1[key].toUpperCase() < obj2[key].toUpperCase()
          : obj1[key].toUpperCase() > obj2[key].toUpperCase()
      )
        return -1;
      else return 1;
    });
    this.setState({ table: newTable });
  }

  loadTable(index) {
    this.createArrowValues(this.state.tableKeys, index);
    this.sortAction(this.props.sortValues[index], index);
  }

  sortTable(index) {
    this.props.saveColumnIndex(index);
    this.editSortDirection(index);
    this.createArrowValues(this.state.tableKeys, index);
    this.sortAction(!this.props.sortValues[index], index);
  }

  render() {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>{this.state.tableKeys.map(this.renderTableHeader)}</tr>
          </thead>
          <tbody>{this.state.table.map(this.renderTableBody)}</tbody>
        </table>
      </div>
    );
  }
}

const arrowStyles = {
  up: {},
  down: {
    transform: "rotate(180deg)"
  }
};

Table.propTypes = {
  sortValues: PropTypes.array,
  arrowValues: PropTypes.array,
  columnIndex: PropTypes.number
};

const mapStateToProps = state => ({
  sortValues: state.table.sortValues,
  arrowValues: state.table.arrowValues,
  columnIndex: state.table.columnIndex
});

const mapDispatchToProps = {
  saveSortValues,
  saveArrowValues,
  saveColumnIndex
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
