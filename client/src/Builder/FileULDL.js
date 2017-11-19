import React, {Component} from "react";
import './FileULDL.css';

import fs from 'fs';
import FileSaver from 'filesaver.js';

class FileULDL extends Component {

  constructor(props) {
    super(props)
    this.state = {
      exportable: false,
      importable: true
    }
  };

  exportHandler() {

    console.log("export requested")

    var blob = new Blob([ { 'foo' : 'bar' } ], {type: "text/plain;charset=utf-8"});

    FileSaver.saveAs(blob, "portfolio.txt");

  }

  importHandler() {
    console.log("Import Requested")
  }

  render() {
    var portfolioImport,
      portfolioExport;

    if (this.state.importable === true) {
      portfolioImport = <div className="file">
        Import Portfolio
        <br/>
        <img
          className="importexport"
          src="https://d30y9cdsu7xlg0.cloudfront.net/png/24574-200.png"
          role="presentation"
          />
      </div>
    } else {
      portfolioImport = <div className="file">
        Import locked
        <br/>
        <img
          className="importexport"
          src="https://d30y9cdsu7xlg0.cloudfront.net/png/9362-200.png"
          role="presentation"
          />
      </div>
    }

    if (this.state.exportable === true) {
      portfolioExport =
      <div
        className="file"
        onClick={this.exportHandler}>
        Export Portfolio
        <br/>
        <img
          className="importexport"
          src="https://d30y9cdsu7xlg0.cloudfront.net/png/24574-200.png"
          role="presentation"
          />
      </div>
    } else {
      portfolioExport =
      <div className="file">
        Export Locked
        <br/>
        <img
          className="importexport"
          src="https://d30y9cdsu7xlg0.cloudfront.net/png/9362-200.png"
          role="presentation"
          />
      </div>
    }



    return (
      <div className="uldl">
        {portfolioImport}
        {portfolioExport}
      </div>

    )

  }
}

export default FileULDL;
