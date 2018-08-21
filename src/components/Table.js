import React, { Component } from "react";
import tableData from "../data/profiles.json";
import "./styles/Table.css";
import { connect } from "react-redux";
import {
  saveColumnIndex,
  saveTableData,
  createSortValues,
  editSortDirection,
  createArrowValues,
  sortTable
} from "../actions/table_actions";
import arrow from "./icons/arrow.svg";
import PropTypes from "prop-types";

class Table extends Component {

  counter = 1;
  tableKeys = Object.keys(tableData[0]);

  componentWillMount() {
    this.props.saveTableData(tableData);
  }

  componentDidMount() {
    const { columnIndex } = this.props;
    this.props.createSortValues();
    this.props.createArrowValues();
    if (columnIndex !== -1) {
      this.loadTable(columnIndex);
    }
  }

  loadTable(index) {
    this.props.createArrowValues();
    this.props.sortTable(this.props.sortValues[index]);
  }

  sortTable(index) {
    this.props.saveColumnIndex(index);
    this.props.editSortDirection();
    this.props.createArrowValues();
    this.props.sortTable(!this.props.sortValues[index]);
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
        {this.tableKeys.map(this.renderTableItem.bind(this, list))}
      </tr>
    );
  };

  renderTableItem(list, item) {
    this.counter++;
    return <td key={this.counter}> {list[item]} </td>;
  }

  render() {
    return (
      <div className="table">
        <table>
          <thead>
            <tr>{this.tableKeys.map(this.renderTableHeader)}</tr>
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
  saveColumnIndex,
  saveTableData,
  createSortValues,
  editSortDirection,
  createArrowValues,
  sortTable
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
