import React, { Component } from "react";
import DynamicForm from "./Child";

class ParentForm extends Component {
  state = {
    data: [],
    modele: [
      { key: "name", label: "Name", required: true },
      { key: "age", label: "Age", type: "number", required: true },
      {
        key: "city",
        label: "City",
        type: "select",
        required: true,
        options: [
          { key: "mumbai", label: "Mumbai", value: "Mumbai" },
          { key: "bangalore", label: "Bangalore", value: "Bangalore" },
          { key: "kerala", label: "Kerala", value: "Kerala" }
        ]
      }
    ]
  };

  onSubmit = model => {
    alert(JSON.stringify(model));
  };

  render() {
    return (
      <div className="App">
        <DynamicForm
          className="form"
          title="Registration"
          model={this.state.modele}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
      </div>
    );
  }
}

export default ParentForm;
