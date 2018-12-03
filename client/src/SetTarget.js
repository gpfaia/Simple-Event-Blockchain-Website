import React, { Component } from 'react';
import './App.css';

class SetTarget extends Component {
  constructor() {
    super();
    this.getSubmit = this.getSubmit.bind(this);
    this.state = { targetNum: "", newTargetNum: "" };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
}

  getSubmit(event) {
    event.preventDefault();
    let newTargetNum = this.state.newTargetNum;
    fetch('/bc/api/setTarget', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newTargetNum}),
    })
    .then(this.getTarget())
    
  }

  getTarget = () => {
    fetch('/bc/api/getTarget')
      .then(res => res.json())
      .then(targetNum => this.setState(targetNum));
    }

  componentDidMount() {
      this.getTarget()
  }

  render() {
    const { targetNum, newTargetNum } = this.state;
    return (
      <div>
        <h5>Current Target: {targetNum}</h5>
        <p>The target is the amount of zeros a hash needs to start with to be valid </p>
        <h6>Set Target</h6>
        <form onSubmit={this.getSubmit}>
          <input 
            id="newTargetNum" 
            name="newTargetNum" 
            type="number"
            min="0" 
            max="10" 
            step="1"
            value={newTargetNum}
            onChange={this.onChange} />
          <button>Submit</button>
        </form>
      </div>

    );
  }
}

export default SetTarget;