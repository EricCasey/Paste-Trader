import React, {Component} from "react";
import './exNav.css';

class exNav extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedNav: 'stacked'
    }
    this.menuClick = this.menuClick.bind(this);
    this.classChecker = this.classChecker.bind(this);
  };

  menuClick(e) {
    e.preventDefault()
    var newSelected = e.target.id;
    this.setState({selectedNav: newSelected})
    this.props.viewChanger(newSelected)
    // console.log(this.props.dataView)
  };

  classChecker(item) {
    if (this.state.selectedNav === item) {
      return `exItem selected`
    } else {
      return `exItem`
    }
  }

  render() {
    return (
      <div className="exBar">
        <div className={this.classChecker("stacked")} onClick={this.menuClick} id="stacked">Stacked Chart</div>
        <div className={this.classChecker("pie")} onClick={this.menuClick} id="pie">Pie Chart</div>
        <div className={this.classChecker("overview")} onClick={this.menuClick} id="overview">Overview</div>
        <div className={this.classChecker("english")} onClick={this.menuClick} id="english">English</div>
      </div>
    );
  }
}

export default exNav;
