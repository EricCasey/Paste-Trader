import React, {Component} from "react";
import './Inputs.css';
import './Card.css';
import Inputs from './Inputs.js'
import PoloniexLogo from './logos/Poloniex.png'
import BittrexLogo from './logos/Bittrex.png'

class Card extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  };

  toggle() {
    //  console.log("toggle requested")
  }

  render() {

    var logoArea = <h3>{this.props.exchange}</h3>
    if (this.props.exchange === "Poloniex") {
      logoArea = <div>
        <img className="logo" src={PoloniexLogo}/>
      </div>
    } else if (this.props.exchange === "BitTrex") {
      logoArea = <div>
        <img className="logo" src={BittrexLogo}/>
      </div>
    }

    return (
      <div key={this.props.index} className="dropdown">
        <p className="remove" id={this.props.exchange} onClick={this.props.handleRemove}>
          x
        </p>
        <div className="toggle" onClick={this.toggle}>
          v
        </div>

        {logoArea}

        <Inputs exchange={this.props.exchange} submitQuery={this.props.submitQuery} conversionData={this.props.conversionData} visData={this.props.visData} raiseTrades={this.props.raiseTrades}/>
      </div>
    )
  }
}

export default Card;
