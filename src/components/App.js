import React, { Component } from "react";
import Table from "./Table";
import "./styles/App.css";
import { Provider } from "react-redux";
import setUpStore from "../store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: null
    };
  }

  componentWillMount = () => {
    const store = setUpStore();
    this.setState({ store });
    store.subscribe(this.localStorageChange);
  };

  localStorageChange = () => {
    const jsonStore = JSON.stringify(this.state.store.getState());
    localStorage.setItem("storeState", jsonStore);
  };

  render() {
    if (!this.state.store) return null;

    return (
      <Provider store={this.state.store}>
        <div className="app">
          <Table />
        </div>
      </Provider>
    );
  }
}

export default App;
