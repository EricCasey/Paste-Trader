import React, {Component} from "react";
import './ExchangeStats.css';

class ExchangeStats extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  };

  render() {

    var view = <div>fuck</div>;

    if (this.props.state.goodP === false &&
        this.props.state.goodT === false &&
        this.props.state.goodD === false &&
        this.props.state.goodW === false) {
      view = <div>
            <br/><br/>
            V-- Input Account Data Below For Stats --V
            </div>
    } else {

      view = (
        <div>
        <div className="statTitles">
          <p className="statTitle">Portfolio</p>
          <p className="statTitle">Trades</p>
          <p className="statTitle">Overall</p>
          <p className="statTitle">Deposits</p>
          <p className="statTitle">Withdrawls</p>
        </div>

        <div className="goodStats">

          <div className="portfolioStats statBox">
            <p className="stat">{this.props.state.portfolio.length} Coins</p>
            <p className="stat">{this.props.state.portfolio.length-1} AltCoins</p>
            <p className="stat">X Coin Mix</p>
          </div>

          <div className="tradeStats statBox">
            <p className="stat">{this.props.state.history.length} Trades</p>
          </div>

          <div className="centerStats statBox">
            <p className="stat">Estimated Value</p>
          </div>

          <div className="depositStats statBox">
            <p className="stat">{this.props.state.tradingFor} Trading Days</p>
            <p className="stat">Account Age</p>
          </div>

          <div className="withdrawlStats statBox">
            <p className="stat"> USD Withdrawn</p>
          </div>

      </div>
      </div>
      )

    }
    return (
      <div className="exStats">
      {view}
      </div>
    )
  }

}

export default ExchangeStats;
