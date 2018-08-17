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
    this.state = {
      table: tableData,
      tableKeys: []
    };
  }

  counter = 1;

  componentWillMount() {
    const tableKeys = Object.keys(this.state.table[0]);
    this.createSortValues(tableKeys);
    this.createArrowValues(tableKeys, this.props.columnIndex);
    this.setState({ tableKeys });
  }

  createSortValues(keys) {
    let sort = [...this.props.sortValues];
    for (let i = 0; i < keys.length; i++) {
      if (i !== this.props.columnIndex) {
        sort[i] = false;
      }
    }
    this.props.saveSortValues(sort);
  }

  createArrowValues(keys, index) {
    let arrows = [];
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
    let newValue = !this.props.sortValues[index];
    let newSortValues = [...this.props.sortValues];
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

  componentDidMount() {
    if (this.props.columnIndex !== -1) {
      this.loadTable(this.props.columnIndex);
    }
  }

  sortAction = (value,index) => {
    const key = this.state.tableKeys[index];
    let newTable;
      newTable = [...this.state.table].sort(function(obj1, obj2) {
        if (value ? obj1[key].toUpperCase() < obj2[key].toUpperCase() : obj1[key].toUpperCase() > obj2[key].toUpperCase()) return -1;
        else return 1;
      });
    this.setState({ table: newTable });
  };

  loadTable = index => {
    this.createArrowValues(this.state.tableKeys, index);
    this.sortAction(this.props.sortValues[index], index);
  };

  sortTable = index => {
    this.props.saveColumnIndex(index);

    this.editSortDirection(index);
    this.createArrowValues(this.state.tableKeys, index);

    this.sortAction(!this.props.sortValues[index], index);
  };

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

const mapDispatchToProps = {
  saveSortValues,
  saveArrowValues,
  saveColumnIndex
};

const mapStateToProps = state => ({
  sortValues: state.table.sortValues,
  arrowValues: state.table.arrowValues,
  columnIndex: state.table.columnIndex
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
