import React, { Component } from "react";
import DynamicForm from "./Child";
import fileXML from "./model.xml";

class ParentForm extends Component {
  state = {
    fetchxml: "",
    xml2json: "",
    data: [],
    modeleMK2: [
      {
        key: "gender",
        label: "Gender",
        type: "radio",

        options: [
          { key: "male", label: "Male", name: "gender", value: "male" },
          { key: "female", label: "Female", name: "gender", value: "female" }
        ]
      },
      // {
      //   key: "features",
      //   label: "Features",
      //   type: "checkbox",
      //   required: false,
      //   options: [
      //     { key: "atm-card", label: "ATM - Card", value: "atm-card" },
      //     { key: "m-banking", label: "M-Banking", value: "m-bangking" },
      //     { key: "vcc", label: "VCC", value: "vcc" }
      //   ]
      // },
      {
        key: "featuresmk2",
        label: "Features MK2",
        type: "checkbox",
        required: false,
        options: [
          { key: "atm-card", label: "ATM - Card", value: "atm-card" },
          { key: "m-banking", label: "M-Banking", value: "m-bangking" },
          { key: "vcc", label: "VCC", value: "vcc" }
        ]
      }
    ],
    modele: [
      { key: "nama", label: "Nama", required: true },
      { key: "usia", label: "Usia", type: "number", required: true },
      {
        key: "bankcabang",
        label: "Bank Cabang",
        type: "select",
        required: true,
        options: [
          { key: "kcp-jakarta", label: "KCP Jakarta", value: "kcp-jakarta" },
          {
            key: "kcp-tangerang",
            label: "KCP Tangerang",
            value: "kcp-tangerang"
          },
          { key: "kcp-bekasi", label: "KCP Bekasi", value: "kcp-bekasi" }
        ]
      },
      {
        key: "gender",
        label: "Gender",
        type: "radio",
        required: true,
        options: [
          { key: "male", label: "Male", name: "gender", value: "male" },
          { key: "female", label: "Female", name: "gender", value: "female" }
        ]
      },
      {
        key: "features",
        label: "Features",
        type: "checkbox",
        options: [
          { key: "atm-card", label: "ATM - Card", value: "atm-card" },
          { key: "m-banking", label: "M-Banking", value: "m-bangking" },
          { key: "vcc", label: "VCC", value: "vcc" }
        ]
      }
    ]
  };

  //Component DID MOUNT
  componentDidMount() {
    this.getXML();
  }

  //How to convert XML to JSON then generate become a Dynamic Form
  getXML = async () => {
    let xml2js = require("xml2js");
    // let urle = "http://10.10.18.199:3000/?tableName=form";

    //Proses Fetch file.xml agar bisa dibaca sebagai teks
    await fetch(fileXML)
      .then(response => response.text())
      .then(response => {
        this.setState({ fetchxml: response });
      })
      .catch(err => {
        console.log("fetch", err);
      });

    let convertedXML;
    let xml = this.state.fetchxml;
    let parser = new xml2js.Parser();
    parser.parseString(xml, function(err, result) {
      // console.log(result);
      convertedXML = result["elements"]["element"];
      // console.log(convertedXML);
    });
    this.setState({ xml2json: convertedXML });
    console.log(this.state.xml2json);
    console.log(this.state.modele);
  };

  onSubmit = model => {
    alert(JSON.stringify(model));
  };

  render() {
    let xmlmodel = this.state.xml2json || [{}];
    return (
      <div className="App">
        <DynamicForm
          className="form"
          title="Registration"
          // model={this.state.modeleMK2}
          model={xmlmodel}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />
      </div>
    );
  }
}

export default ParentForm;
