import React, { Component } from "react";
import tableData from "../data/profiles.json";
import "./styles/Table.css";
import { connect } from "react-redux";
import { createTable, sortTable } from "../actions/table_actions";
import arrow from "./icons/arrow.svg";
import PropTypes from "prop-types";

class Table extends Component {
  counter = 1;

  componentWillMount() {
    if (!this.props.tableData.length) {
      this.props.createTable(tableData);
    }
  }

  renderTableHeader = (item, index) => {
    this.counter++;
    return (
      <th key={this.counter} onClick={this.props.sortTable.bind(this, index)}>
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
    const tableKeys = Object.keys(this.props.tableData[0]);
    return (
      <tr key={this.counter}>
        {tableKeys.map(this.renderTableItem.bind(this, list))}
      </tr>
    );
  };

  renderTableItem(list, item) {
    this.counter++;
    return <td key={this.counter}> {list[item]} </td>;
  }

  render() {
    if (!this.props.tableData.length) return null;

    const tableKeys = Object.keys(this.props.tableData[0]);

    return (
      <div className="table">
        <table>
          <thead>
            <tr>{tableKeys.map(this.renderTableHeader)}</tr>
          </thead>
          <tbody>{this.props.tableData.map(this.renderTableBody)}</tbody>
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
  columnIndex: PropTypes.number,
  tableData: PropTypes.array
};

const mapStateToProps = state => ({
  sortValues: state.table.sortValues,
  arrowValues: state.table.arrowValues,
  columnIndex: state.table.columnIndex,
  tableData: state.table.tableData
});

const mapDispatchToProps = {
  createTable,
  sortTable
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
