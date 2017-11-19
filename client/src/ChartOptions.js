import React, {Component} from "react";
import './ChartOptions.css';
import Autocomplete from 'react-autocomplete'

class ChartOptions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedExchange: '',
      exchInputValue: '',
      pairInputValue1: 'Bitcoin (BTC)',
      pairInputValue2: '',
      inputValue3: '',
      queryCoin1: '',
      queryCoin2: '',
      queryExchange: '',
      timeType: 'histoday'
    }
    this.submitQuery = this.submitQuery.bind(this);
  };

  submitQuery() {
    var c1 = this.state.queryCoin1,
        c2 = this.state.queryCoin2,
        ex = this.state.queryExchange,
        type = this.state.timeType,
        units = 1500,
        agr = 1;
    this.props.submitQuery(c1,c2,ex,type,units,agr)
  }

  render() {
    var coinNames = [1,2,3];
    // console.log(this.props.coinList[0])
    // console.log(this.props.coinList[1])
    if(this.props.coinList === [ ]) {
      coinNames = [1,2,3];
    } else {
      coinNames = this.props.coinList[0]
    }
//     var inputStyle = {
//   borderRadius: '3px',
//   boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
//   background: 'rgba(255, 255, 255, 0.9)',
//   padding: '2px 0',
//   fontSize: '90%',
//   position: 'fixed',
//   overflow: 'auto',
//   maxHeight: '50%', // TODO: don't cheat, let it flow to the bottom
// }
    return (
      <div id="optionsContainer">
        <div id="options">
          <div id="comboSelect">
              <Autocomplete
                id="AC1"
                items={coinNames}
                selectOnBlur={true}
                shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={(item) => item}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item}
                  </div>
                }
                value={this.state.pairInputValue1}
                onChange={(e) => this.setState({ pairInputValue1 : e.target.value })}
                onSelect={(val) => {
                  //console.log(val.split(' ').pop().slice(1,-1))
                  this.setState({
                    pairInputValue1 : val,
                    queryCoin1 : val.split(' ').pop().slice(1,-1)
                  })
                  //console.log(this.props.coinList[1][this.props.coinList[0].indexOf(val)])
                  this.props.getCoin2(this.props.coinList[1][this.props.coinList[0].indexOf(val)])
                  }
                }
              />
            - / -
              <Autocomplete
                id="AC2"
                items={this.props.pairList}
                selectOnBlur={true}
                shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={(item) => item}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item}
                  </div>
                }
                value={this.state.pairInputValue2}
                onChange={(e) => { this.setState({ pairInputValue2 : e.target.value }) }}
                onSelect={(val) => {
                  this.setState({
                    pairInputValue2 : val,
                    queryCoin2 : val
                  })
                   }}
              />
            - on -
              <Autocomplete
                id="AC3"
                items={this.props.exchangePair}
                selectOnBlur={true}
                shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={(item) => item}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item}
                  </div>
                }
                value={this.state.exchInputValue}
                onChange={(e) => { this.setState({ exchInputValue : e.target.value }) }}
                onSelect={(val) => {
                  this.setState({
                    exchInputValue : val,
                    queryExchange: val
                  })
                }}
              />
          </div>


          <button
            onClick={this.submitQuery}
            onSubmit={this.submitQuery}
            >Submit Request!
          </button>


        </div>
      </div>
    )
  }
}

export default ChartOptions;
