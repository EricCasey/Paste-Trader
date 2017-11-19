import React, {Component} from "react";

import './App.css';

import NavBar from './NavBar.js';
import BaseChart from './baseChart.js';
import Builder from './Builder/Builder.js';
import About from './About.js';
import How from './How.js';

import octoLogo from './images/octologo.png'

import getExchanges from './functions/getExchanges';
import getCoinList from './functions/getCoinList';
import getAvailablePairs from './functions/getAvailablePairs';
import submitQuery from './functions/submitQuery';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      priceData: [],
      currentPrice: 0,
      count: 0,
      firstPrice: 0,
      currentView: 'inputs',
      lowestPrice: 0,
      highestPrice: 0,
      priceLine: [],
      exchanges: [],
      coinList: 'empty',
      availPairs: [],
      exchangePair: [],
      conversionData: 'empty',
      visData: [],
      basicExchangeTitle: '',
      usdbtcLine: []
    }
    this.viewChanger = this.viewChanger.bind(this);
    this.raiseTrades = this.raiseTrades.bind(this);

    this.getExchanges = getExchanges.bind(this);
    this.getCoinList = getCoinList.bind(this);
    this.getCoin2 = getAvailablePairs.bind(this);
    this.submitQuery = submitQuery.bind(this);
  };

  componentWillMount() {
    this.getExchanges()
    this.getCoinList()
  }

  viewChanger(target) {
    this.setState({currentView: target})
  }

  raiseTrades(trades, btcLine) {
    this.setState({
      tradeHistory: trades,
      btcLine: btcLine
    })
  }

  raiseDeposits(growingBTC) {
    this.setState({depositArray: growingBTC})
  }

  render() {
    console.log(this.state)
    var view = ''
    if (this.state.currentView === 'base') {
      view = <BaseChart priceData={this.state.priceData} currentPrice={this.state.currentPrice} firstPrice={this.state.firstPrice} firstDate={this.state.firstDate} count={this.state.count} highestPrice={this.state.highestPrice} lowestPrice={this.state.lowestPrice} exchanges={this.state.exchanges} coinList={this.state.coinList} getCoin2={this.getCoin2} pairList={this.state.availPairs} exchangePair={this.state.exchangePair} submitQuery={this.submitQuery} openHistory={this.state.openHistory} closeHistory={this.state.closeHistory} highHistory={this.state.highHistory} lowHistory={this.state.lowHistory} timeHistory={this.state.timeHistory} basicExchangeTitle={this.state.basicExchangeTitle}/>
    } else if (this.state.currentView === 'inputs') {
      view = <Builder exchangeList={this.state.exchanges} submitQuery={this.submitQuery} conversionData={this.state.conversionData} visData={this.state.visData} raiseTrades={this.raiseTrades} raiseDeposits={this.raiseDeposits}/>
    } else if (this.state.currentView === 'how') {
      view = <How />
    } else if (this.state.currentView === 'about') {
      view = <About />
    } else if (this.state.currentView === 'ticker') {
      view = <div>live ticker goes here</div>
    }
    return (
      <div className="App">
        <div className="App-header">
          <img id="cv" src={octoLogo}/>
          <p>The no-login, no-database, cookie-less, ad-less, worry-free cryptocurrency portfolio manager.</p>
        </div>

        <NavBar selectedNav={this.state.currentView} clickHandler={this.viewChanger}/>

      {view}

      </div>
    );
  }
}

export default App;
