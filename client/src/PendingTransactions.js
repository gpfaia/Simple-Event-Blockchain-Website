import React, { Component } from 'react';
import './App.css';

class PendingTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = { transactionArray: [], changeArray: [], targetCheck: false };
    this.getSubmit = this.getSubmit.bind(this);
  }
  
  onChange = (e) => {
    let index
    if (e.target.checked) {
      this.state.changeArray.push(parseInt(e.target.value));
    } else {
      index = this.state.changeArray.indexOf(parseInt(e.target.value));
      this.state.changeArray.splice(index, 1)
    }
    this.setState({ changeArray: this.state.changeArray })
  }

  getTransactionArray = () => {
    fetch('/bc/api/getTransactionArray')
      .then(res => res.json())
      .then(transactionArray => this.setState(transactionArray));
  }

  generateNextBlock(data) {  
    return fetch('/bc/api/generateNextBlock', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      })
    }

  updateTransactionArr(data) {
    return fetch('/bc/api/updateTransactionArray', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      })
    }

  getSubmit(event) {
    event.preventDefault();
    const finalTransactions = this.state.changeArray
                              .map(elem => this.state.transactionArray.splice(elem))
    this.generateNextBlock(finalTransactions).then(response => 
      {if (response.status !== 200) {
        this.setState({ targetCheck: true })
      } else {
        this.updateTransactionArr(this.state.changeArray)
          .then(this.setState({ changeArray: [], targetCheck: false})
        );
      }
    })
  }


  componentDidMount() {
    this.getTransactionArray()
    this.interval = setInterval(() => this.getTransactionArray(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="PA">
        <h1>Pending Transactions</h1>
        <form onSubmit={this.getSubmit}>
        {this.state.transactionArray.map((transaction, index) =>
          <div>
            <label>{transaction}</label>
            <input type="checkbox" name={index} value={index} onChange={this.onChange}/>
          </div>
        )}
        { this.state.transactionArray.length > 0 ? <button>Mine!</button> :  null}
        </form>
        {this.state.targetCheck && <div><p>UNABLE TO MINE!</p> 
        <p>Retry with less transactions or a smaller target</p></div>}
      </div>
    );
  }
}

export default PendingTransactions;