import React, {Component} from "react";
import './baseChart.css';
import ChartOptions from './ChartOptions.js';

import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-finance';

const PlotlyComponent = createPlotlyComponent(Plotly);

// const {Chart, Dots, Lines, Ticks} = require('rumble-charts');

class baseChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      priceData: this.props.priceData,
      currentPrice: this.props.currentPrice,
      count: this.props.count,
      firstPrice: this.props.firstPrice,
      firstDate: this.props.firstDate
    }
  };

  componentWillMount() {
    this.setState({priceData: this.props.priceData})
  }

  render() {
    var options,
      chart
    if (this.props.coinList === 'empty') {
      return <div id="loader">
        <img src="http://gifimage.net/wp-content/uploads/2017/08/loading-gif-transparent-10.gif" className="loading" role="presentation"/>
      </div>
    } else {
      options = <ChartOptions exchanges={this.props.exchanges} coinList={this.props.coinList} getCoin2={this.props.getCoin2} pairList={this.props.pairList} exchangePair={this.props.exchangePair} submitQuery={this.props.submitQuery}/>
    }
    let data = [
      {
        x: this.props.timeHistory,
        close: this.props.closeHistory,
        decreasing: {
          line: {
            color: '#f44141'
          }
        },
        high: this.props.highHistory,
        increasing: {
          line: {
            color: '#5cf442'
          }
        },
        line: {
          color: '#070606'
        },
        low: this.props.lowHistory,
        open: this.props.openHistory,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
    ]
    let layout = { // all "layout" attributes: #layout
      title: this.props.basicExchangeTitle,  // more about "layout.title": #layout-title
      showlegend: false,
      xaxis: { // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time' // more about "layout.xaxis.title": #layout-xaxis-title
      },
      yaxis: {
        title: 'price'
      },
      annotations: [ // all "annotation" attributes: #layout-annotations
        // {
        //   text: 'simple annotation',    // #layout-annotations-text
        //   x: 0,                         // #layout-annotations-x
        //   xref: 'paper',                // #layout-annotations-xref
        //   y: 0,                         // #layout-annotations-y
        //   yref: 'paper'                 // #layout-annotations-yref
        // }
      ]
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    chart = <div id="chartArea">
      <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
    </div>
    return (
      <div id="chartArea">
        <div className="btcprice">
          <div className="stats">
            <h3>Summary Statistics:</h3>
            <div id="point">
              last BTC/USD price received: {this.props.currentPrice.toFixed(2)}
            </div>
            <div id="count">
              Count of Datapoints: {this.props.count}
            </div>
            <div id="firstPrice">
              FirstPrice: {this.props.firstPrice}
            </div>
            <div id="date">
              First Date: {this.props.firstDate}
            </div>
            <div id="ATL">
              ATL: {this.props.lowestPrice}
            </div>
            <div id="ATH">
              ATH: {this.props.highestPrice}
            </div>
          </div>
          {options}
          {chart}
        </div>
      </div>
    );
  }
}

export default baseChart;
