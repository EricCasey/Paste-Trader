import React, {Component} from "react";
import './ExchangeSelector.css';
import Autocomplete from 'react-autocomplete'

class ExchangeSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      selectedExchanges: []
    }
    this.handleSelect = this.handleSelect.bind(this);
  };

  handleSelect(val) {
    this.props.selectExchange(val)
    this.setState({selectedExchanges: this.props.selectedExList})
  }

  componentDidMount() {}

  render() {
    //  console.log(this.state.exchangeData + "  < -- exchanges")
    // console.log(this.props.selectedExList)
    var selected = this.props.selectedExList
    // console.log(selected)
    return (
      <div className="ExchangeSelector">
        <h4>Choose From {this.props.exchangeList.length} Exchanges</h4>
        <Autocomplete id="AC-exchanges" items={this.props.exchangeList} selectOnBlur={true} shouldItemRender={(item, value) => item.toLowerCase().indexOf(value.toLowerCase()) > -1} getItemValue={(item) => item} renderItem={(item, isHighlighted) => <div style={{
          background: isHighlighted
            ? 'lightgray'
            : 'white'
        }}>
          {item}
        </div>} value={this.state.inputValue} onChange={(e) => {
          this.setState({inputValue: e.target.value})
        }} onSelect={(val) => {
          this.handleSelect(val)
        }}/>

        <div className="shortlist">
          {selected.map((ex, i) => {
            // console.log(ex)
            return (
              <div className="short" key={i}>
                {ex}
                <div onClick={this.props.handleRemove} className="remove" id={ex}>
                  x
                </div>
              </div>
            )
          })}
        </div>


      </div>
    );
  }
}

export default ExchangeSelector;
