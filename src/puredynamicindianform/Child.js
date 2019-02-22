import React, { Component } from "react";

class DynamicForm extends Component {
  state = {};

  //Kirim ke Parent JS
  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
  };

  //Ketika Form Diubah Isinya
  onChange = async (e, key, type = "single") => {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      console.log(e.target.value); //atm
      console.log([key].toString()); //features
      console.log(e.target.value, e.target.checked);

      console.log(e.target.checked);

      if (this.state[key] === undefined) {
        alert("undefined cuuuy");
      }

      if (e.target.checked === true) {
        e.target.checked = true;
        this.setState({
          [key]: [...this.state[key], e.target.value]
        });
        console.log(this.state[key]);
      } else {
        e.target.checked = false;
        function arrayRemove(arr, value) {
          return arr.filter(function(ele) {
            return ele !== value;
          });
        }

        let minusres = arrayRemove(this.state[key], e.target.value);

        await this.setState({
          [key]: minusres
        });
      }

      // Batas suci =========================================================
      // if (e.target.checked == true) {
      //   //Insert Array ===========================
      //   let insertion = e.target.value;

      //   await this.setState({
      //     value: [...this.state.value, insertion]
      //   });
      // } else {
      //   //Remove Array =========================
      //   function arrayRemove(arr, value) {
      //     return arr.filter(function(ele) {
      //       return ele != value;
      //     });
      //   }

      //   let aryxg = arrayRemove(this.state.value, e.target.value);

      //   await this.setState({
      //     value: aryxg
      //   });
      // }

      // this.setState({
      //   [key]: this.state.value
      // });

      //Batas suci ==========================

      // let found = this.state[key]
      //   ? this.state[key].find(d => d === e.target.value)
      //   : false;

      // console.log(found);

      // if (found) {
      //   let data = this.state[key].filter(d => {
      //     return d !== found;
      //   });
      //   this.setState({
      //     [key]: data
      //   });
      // } else {
      //   this.setState({
      //     [key]: [e.target.value, ...this.state[key]]
      //   });
      // }
    }
  };

  handleUndef = (key, undef) => {
    if (undef === undefined) {
      this.setState({
        [key]: []
      });
    }
  };

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type + [] || "text" || m.type;
      let value = m.value;
      let required = m.required;
      let props = m.props || {};
      let options = m.options || [0];

      console.log(options[0]);

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
      //End If

      //Kalo Form typenya Select
      if (type === "select") {
        input = options.map(o => {
          console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.label}
            </option>
          );
        });

        // console.log("Select default: ", value);
        input = (
          <select
            defaultValue=""
            required={required}
            onChange={e => {
              this.onChange(e, m.key);
            }}
          >
            <option value="" disabled>
              {"-= Select " + m.label + " =-"}
            </option>
            {input}
          </select>
        );
      }
      //End If

      //Kalo type-nya radio
      if (type === "radio") {
        input = m.options.map(o => {
          console.log("select: ", o.value, value);
          return (
            <React.Fragment key={"fr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={value}
                value={o.value}
                required={required}
                onChange={e => {
                  this.onChange(e, o.name);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }
      //End IF

      //Kalo tipe-nya checkbox
      if (type === "checkbox") {
        input = m.options.map(o => {
          //--== WARNING HERE ==--

          this.handleUndef(key, this.state[key]);

          let advrequired;

          let panjang = this.state[key] || [""];

          if (m.required.toString() === "true") {
            if (panjang.length === 0) {
              advrequired = true;
            } else {
              advrequired = false;
            }
          }

          return (
            <React.Fragment key={"cfr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={o.checked}
                value={o.value}
                required={advrequired}
                onChange={e => {
                  this.onChange(e, m.key, "multiple");
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }
      //End IF

      return (
        <div key={key + []} className="form-group">
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
