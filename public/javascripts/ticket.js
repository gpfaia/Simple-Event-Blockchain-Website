class Ticket {
    constructor(sender, receiver, seat, eventId) {
      this.sender = sender;
      this.receiver = receiver;
      this.seat = seat;
      this.eventId = eventId;
  }
}

class TransactionList {
  constructor() {
    this.transArray = [];
  }
}

module.exports = {Ticket, TransactionList}