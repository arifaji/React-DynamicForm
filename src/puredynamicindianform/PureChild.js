import React, { Component } from "react";

class DynamicForm extends Component {
  state = {};

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  onChange = (e, key, type = "single") => {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        this.setState({
          [key]: [e.target.value, ...this.state[key]]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let value = m.value;
      let required = m.required;
      let props = m.props || {};

      //If Input is default / Normal text
      let input = (
        <input
          required={m.required}
          ref={key => {
            this[m.key] = key;
          }}
          className="form-input"
          type={type}
          key={"input" + m.key}
          onChange={e => {
            this.onChange(e, key);
          }}
        />
      );

      if (type === "select") {
        input = m.options.map(o => {
          // console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.value}
            </option>
          );
        });

        console.log("Select default: ", value);
        input = (
          <select
            defaultValue=""
            required={required}
            onChange={e => {
              this.onChange(e, m.key);
            }}
          >
            <option value="" disabled>
              -= Select City =-
            </option>
            {input}
          </select>
        );
      }

      return (
        <div key={key} className="form-group">
          <label className="form-label" key={"label" + m.key} htmlFor={m.key}>
            {m.label}
          </label>
          {input}
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";
    return (
      <div className={this.props.className}>
        <h3>{title}</h3>
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
          <div className="form-group">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default DynamicForm;
