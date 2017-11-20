import React, {Component} from "react";

import './Builder.css';
import './Inputs.css';

import ExchangeSelector from './ExchangeSelector'
import Card from './Card'
import FileULDL from './FileULDL'

class Builder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedExList: [ "Poloniex" ],
      idArray: [ ]
    }
    this.selectExchange = this.selectExchange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  };

  selectExchange(target) {
    this.setState({
      selectedExList : this.state.selectedExList.concat(target)
    })
  }

  handleRemove(e) {
    var arr = this.state.selectedExList,
        index = this.state.selectedExList.indexOf(e.target.id)
    if (index !== -1) {
      arr.splice(index, 1);
    }
    this.setState({
      selectedExList : arr
    })
  }

  render() {
    var view;
    if (this.state.selectedExList.length === 0) {
      view = <div className="choices">
        <h3>Select Exchanges from the right</h3>
        <h3>or Import your portfolio</h3>
        <h3>HOW IT WORKS</h3>
      </div>
    } else {
      view = this.state.selectedExList.map((exchange, index) => {
        return (
          <Card
          exchange={exchange}
          key={index}
          submitQuery={this.props.submitQuery}
          conversionData={this.props.conversionData}
          histVisData={this.props.histVisData}
          pieVisData={this.props.pieVisData}
          raiseTrades={this.props.raiseTrades}
          raiseDeposits={this.props.raiseDeposits}
          />
        )
      })
    }
    return (
      <div className="BuilderView">
        <div className="inputOptions">
          <FileULDL
            visExport={this.props.histVisData}
            />
          <ExchangeSelector
            exchangeList={this.props.exchangeList}
            selectExchange={this.selectExchange}
            selectedExList={this.state.selectedExList}
            handleRemove={this.handleRemove}
            />
        </div>

        {view}

      </div>
    );
  }
}

export default Builder;
