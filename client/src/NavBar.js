import React, {Component} from "react";
import './NavBar.css';

class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedNav: this.props.selectedNav
    }
    this.menuClick = this.menuClick.bind(this);
    this.classChecker = this.classChecker.bind(this);
  };

  menuClick(e) {
    e.preventDefault()
    var newSelected = e.target.id;
    this.setState({selectedNav: newSelected})
    this.props.clickHandler(newSelected)
  };

  classChecker(item) {
    if (this.state.selectedNav === item) {
      return `menuItem selected`
    } else {
      return `menuItem`
    }
  }

  render() {
    return (
      <div className="NavBar">
        <div className={this.classChecker("ticker")} onClick={this.menuClick} id="ticker">Live Tickers</div>
        <div className={this.classChecker("base")} onClick={this.menuClick} id="base">Basic Chart</div>
        <div className={this.classChecker("inputs")} onClick={this.menuClick} id="inputs">Exchange Inputs</div>
        <div className={this.classChecker("how")} onClick={this.menuClick} id="how">How It Works</div>
        <div className={this.classChecker("about")} onClick={this.menuClick} id="about">About</div>
      </div>
    );
  }
}

export default NavBar;
