import React, {Component} from "react";
import './Pie.css';

import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-basic';
const PlotlyPie = createPlotlyComponent(Plotly);

class Pie extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedDate: this.props.pieVisData[0].x.length,
      pieDataPayload: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.pieData = this.pieData.bind(this);
  };

  componentWillMount() {
    this.pieData(this.state.selectedDate)
  }

  pieData(date) {
    // console.log("printing visdata at pie chart")
    // console.log(date)
    // console.log("selectedDate = " + this.state.selectedDate)

    var newValues = [],
        newLabels = []

    this.props.pieVisData.map((coin, index) => {
      console.log(coin.name, coin.y[1])
      if(coin.y[this.state.selectedDate - 1] === 0) {
      } else {
        newValues.push(coin.y[this.state.selectedDate - 1])
        newLabels.push(coin.name)
      }
    })
    // console.log(newValues)
    console.log(newLabels)
    this.setState({
      pieDataPayload: [{
        type: 'pie',
        values: newValues,
        labels: newLabels
      }]
    })
    console.log("payload set")
  }

  handleChange(value) {
    console.log("building dataset for pie chart after change" + this.props.pieVisData[0].x[value]);
    this.setState({
      selectedDate: value
    })
    this.pieData(value)
  }

  render() {
    console.log("Building Pie Chart")
    console.log(this.state.pieDataPayload)
    console.log(this.props.pieVisData)
    // console.log(this.props.coins.length - 2)

    let layout = {
      title: this.props.exchange + " on " + this.props.pieVisData[0].x[this.state.selectedDate - 1] + " with " + this.state.pieDataPayload[0].labels.length + " coins", // more about "layout.title": #layout-title
      showlegend: true,
      font: {
        'color':'rgb(0,128,0)'
      },
      plot_bgcolor: 'rgb(33,33,33)',
      paper_bgcolor: 'rgb(0, 0, 0)',
      autosize: true,
      hovermode: 'closest',
      border: 'none'
    };
    let config = {
      showLink: true,
      displayModeBar: true
    };

    return (

      <div className="Pie">
        <div className="pieOptions">
          <p className="date">{this.props.pieVisData[0].x[this.state.selectedDate - 1]}</p>
          <input
            type="range"
            min="1"
            max={this.props.pieVisData[0].x.length}
            defaultValue={this.state.selectedDate}
            className="slider"
            id="myRange"
            onChange={(e) => {this.handleChange(e.target.value, e.target.name)}}
            />
        </div>
        <div id="chartArea">
          <PlotlyPie className="whatever" data={this.state.pieDataPayload} layout={layout} config={config}/>
        </div>
      </div>
    );

  }
}

export default Pie;
