import React, {Component} from "react";
import './About.css';
import poloBTC from './images/poloBTC.png'

class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  };

  render() {

    return (
      <div className="aboutContainer">
        <div id="content">
          <br/>
          <h2>About This App</h2>
          <p>
            This project was started in September 2017 by Eric Casey.
          </p>
          <h2>Donate</h2>
          <p>1BK84p577vHVcCkoY1zkxHwsmWuNVXV6xp</p>
          <img src={poloBTC} role="presentation" />
        </div>

      </div>
    );

  }
}

export default About;
