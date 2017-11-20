import React, {Component} from "react";
import './Inputs.css';
import ExNav from './exNav'
import timestamp from 'time-stamp';

import Stacked from './Stacked';
import Pie from './Pie';

import verifyPortfolio from './verifiers/Poloniex/portfolio';
import verifyHistory from './verifiers/Poloniex/history';
import generateProfiles from './verifiers/Poloniex/profiles';
import generateDeposits from './verifiers/Poloniex/deposits';
import ExchangeStats from './ExchangeStats'

class Inputs extends Component {

  constructor(props) {
    super(props)
    this.state = {
      portfolio: '',
      history: '',
      rawValue: '',
      dataView: 'locked',
      coins: [],
      tradingFor: 0,
      coinProfiles: {},
      BTCpriceLine: [],
      coinTradeDays: {},
      amountHistory: {},
      investment: '',
      BTCHistory: {},
      growingBTC: [],
      goodP: false,
      goodT: false,
      goodD: false,
      goodW: false,
      BTCchanges: 'empty'
    }
    this.onPortfolioChange = this.onPortfolioChange.bind(this);
    this.onHistoryChange = this.onHistoryChange.bind(this);
    this.onDepositChange = this.onDepositChange.bind(this);
    this.visualize = this.visualize.bind(this);
    this.genProfiles = this.genProfiles.bind(this);
    this.onUSDChange = this.onUSDChange.bind(this);
    this.viewChanger = this.viewChanger.bind(this);
    this.resetField = this.resetField.bind(this);

    this.verifyPortfolio = verifyPortfolio.bind(this);
    this.verifyHistory = verifyHistory.bind(this);
    this.generateProfiles = generateProfiles.bind(this);
    this.generateDeposits = generateDeposits.bind(this);
    // this.makeBTCline = this.makeBTCline.bind(this);
  };

  onPortfolioChange(e) {
    this.verifyPortfolio(e)
  }

  onHistoryChange(e) {
    this.verifyHistory(e)
  }

  onDepositChange(e) {
    this.generateDeposits(e)
  }

  genProfiles(trades, units) {
    this.generateProfiles(trades, units)
  }

  raiseTrades(tradeInfo, btcLine) {
    this.props.raiseTrades(tradeInfo, btcLine)
  }

  raiseDeposits() {
    this.props.raiseDeposits(this.state.growingBTC)
  }

  getConversionData(units) {
    var c1 = 'BTC',
      c2 = 'USD',
      ex = this.props.exchange,
      type = 'histoday',
      units = units,
      agr = 1
    // console.log(c1,c2,ex,type,units,agr)
    this.props.submitQuery(c1, c2, ex, type, units, agr, 'conversion')
  }

  visualize(e) {
    var coins = this.state.coins,
      dataPayload = [],
      tradeWindow = this.state.tradingFor,
      disabledCount = 0
    // console.log(coins)

    coins.map((coin, index) => {
      // console.log(coin)
      if (coin === "Temporarily Disabled") {
        // console.log("disabled")
        disabledCount++
      } else {
        var coinWindow = 0,
          profile = {},
          trades = this.state.coinTradeDays[coin]
        if (coin === "BTC") {
          var c1 = 'BTC',
            c2 = 'USD',
            ex = this.props.exchange,
            type = 'histoday',
            queryUnits = this.state.tradingFor,
            agr = 1,
            typeQ = 'base'
        } else {
          var cherry = new Date(trades[0]),
            now = timestamp(),
            date2 = new Date(now),
            timeDiff = Math.abs(date2.getTime() - cherry.getTime()),
            units = Math.ceil(timeDiff / (1000 * 3600 * 24)),
            c1 = coin,
            c2 = 'BTC',
            ex = this.props.exchange,
            type = 'histoday',
            queryUnits = units,
            agr = 1,
            typeQ = 'vis'
        }

        // console.log(c1,c2,ex,type,queryUnits,agr,typeQ)

        this.props.submitQuery(c1, c2, ex, type, queryUnits, agr, typeQ)

      }
    })
    this.setState({dataView: 'stacked'})
  }

  onUSDChange(e) {
    //  console.log(e.target.value)
    this.setState({investment: e.target.value})
  }

  viewChanger(target) {
    if (this.state.dataView !== "locked") {
      this.setState({dataView: target})
    }
  }

  unlock() {
    // check if I have enough data to unlock the charts
  }

  resetField(e) {
    // console.log(e.target.id)
    if (e.target.id === "portfolio") {
      this.setState({goodP: false})
    } else if (e.target.id === "trades") {
      this.setState({goodT: false})
    } else if (e.target.id === "deposits") {
      this.setState({goodD: false})
    } else if (e.target.id === "withdrawls") {
      this.setState({goodW: false})
    }
  }

  render() {
    if (this.props.conversionData === 'empty') {
    } else {
      this.visualize
      // console.log(this.state)
    }

    var dataView;
    if (this.state.dataView === 'locked') {
      dataView = <div className=""><img className="locked" src="http://diego.org/wp-content/uploads/2015/08/icon-512@x.png"/></div>
    } else if (this.state.dataView === 'stacked') {
      dataView = <Stacked
        exchange={this.props.exchange}
        coins={this.state.coins}
        dataPayload={this.state.dataPayload}
        histVisData={this.props.histVisData}
        investment={this.state.investment}/>
    } else if (this.state.dataView === 'pie') {
      dataView = <Pie
        exchange={this.props.exchange}
        coins={this.state.coins}
        dataPayload={this.state.dataPayload}
        pieVisData={this.props.pieVisData}
        investment={this.state.investment}/>
    } else if (this.state.dataView === 'profit table') {
      dataView = <div>btc excel table here (exportable)</div>
    } else if (this.state.dataView === 'english') {
      dataView = <div>plain english here</div>
    } else {
      dataView = <div>loading</div>
    }
    // console.log(this.state)
    var locked = <div className="success"><img className="lock" src="https://lh3.googleusercontent.com/E2YWvdcxMJb9_3Fh8qFv5HovP4Cb31rzVWWUuIreUh3iXMq4UY8m6u0A0pD_avD4t1s=w300"/></div>
      var pBox,
        tBox,
        dBox,
        wBox;

      if (this.state.goodP === false) {
        pBox = <textarea id="portfolio" className="input" onChange={this.onPortfolioChange} placeholder="Portfolio"/>
      }
      if (this.state.goodT === false) {
        tBox = <textarea id="history" className="input" onChange={this.onHistoryChange} placeholder="Trades"/>
      }
      if (this.state.goodD === false) {
        dBox = <textarea id="deposits" className="input" onChange={this.onDepositChange} placeholder="Deposits"/>
      }
      if (this.state.goodW === false) {
        wBox = <textarea id="withdrawls" className="input" onChange={this.onWithdrawlChange} placeholder="Withdrawls"/>
      }

      if (this.state.goodP === true) {
        pBox = locked
      }
      if (this.state.goodT === true) {
        tBox = locked
      }
      if (this.state.goodD === true) {
        dBox = locked
      }
      if (this.state.goodW === true) {
        wBox = locked
      }

      if (this.state.goodP === 'invalid') {
        pBox = <div id="portfolio" className="invalid" onClick={this.resetField}>Invalid. Reset.</div>
      }
      if (this.state.goodT === 'invalid') {
        tBox = <div id="trades" className="invalid" onClick={this.resetField}>Invalid. Reset.</div>
      }
      if (this.state.goodD === 'invalid') {
        dBox = <div id="deposits" className="invalid" onClick={this.resetField}>Invalid. Reset.</div>
      }
      if (this.state.goodW === 'invalid') {
        wBox = <div id="withdrawls" className="invalid" onClick={this.resetField}>Invalid. Reset.</div>
      }

      return (
        <div className="inputView">
          <ExchangeStats state={this.state}/>
          <div className="areas">

            {pBox}
            {tBox}

            <div id="middle">
              <input className="investment" id="investment" placeholder="Investment" onChange={this.onUSDChange}/>
              <br></br>
              <div className="visBTN" onClick={this.visualize} id={this.props.exchange}>
                Visualize {this.props.exchange}
              </div>
            </div>

            {dBox}
            {wBox}

          </div>

          <ExNav dataView={this.state.dataView} viewChanger={this.viewChanger}/> {dataView}
        </div>
      );
    }
  }

  export default Inputs;
