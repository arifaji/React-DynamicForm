import React, { Component } from "react";
import "./App.css";
import DynamicForm from "./puredynamicindianform/Parent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <DynamicForm />
      </div>
    );
  }
}

export default App;
