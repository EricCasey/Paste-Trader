import React, {Component} from "react";
import './How.css';

class How extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  };

  render() {

    return (
      <div className="howContainer">
        <div id="content">
          <br/>
          <h2>How It Works</h2>
          <ol>
            <li>Step 1</li>
            <li>Step 2</li>
          </ol>
        </div>

      </div>
    );

  }
}

export default How;
