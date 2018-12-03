import React, { Component } from 'react';
//import './App.css';


class TicketInformationForm extends Component {
  constructor() {
    super();
    this.state = { sendEmail: "", receiveEmail: "", Seat: "", EventId: 0, loading: false };
    this.getSubmit = this.getSubmit.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  createTicket() {  
    let {sendEmail, receiveEmail, Seat, EventId } = this.state;
    return fetch('/bc/api/createTicket', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sendEmail, receiveEmail, Seat, EventId}),
      })
    }

  getSubmit(event) {
    this.setState({ loading: true });
    this.render();
    event.preventDefault();
    this.createTicket().then(this.setState({ loading: false }))
    ;
  }

  render() {
    let { sendEmail, receiveEmail, Seat, EventId, loading } = this.state;
    return (
      <div>
        <div>
        <h3>Create Transaction</h3>
        <form onSubmit={this.getSubmit}>
          <label>Sender Email</label>
          <input id="sender" name="sendEmail" 
            value={sendEmail}
            onChange={this.onChange}
            type="email" />
          <label >Receiver Email</label>
          <input id="receiver" name="receiveEmail"
            value={receiveEmail}
            onChange={this.onChange}
            type="email" />
          <label>Seat</label>
          <input id="seat" name="Seat"
            value={Seat}
            onChange={this.onChange}
            type="text" />
          <label>EventId </label>
          <input id="eventId" name="EventId" 
            value={EventId}
            onChange={this.onChange}
            type="number" min="0" step="1" />
          <button>Generate New Pending Transaction</button> 
          {loading ? <img src="/images/loading.gif" alt=""/> : <div></div>}
        </form></div>
      </div>
    );
  }
}

export default TicketInformationForm;