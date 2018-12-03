import React, { Component } from 'react';
import {Route, NavLink, HashRouter } from "react-router-dom";
import TicketInformationForm from "./SubmitData";
import BlockChainView from "./App";
import SetTarget from "./SetTarget";
import PendingTransactions from "./PendingTransactions";


class NavBar extends Component {
  render() {
    return (
        <HashRouter>
        <div>
          <ul className="header">
            <li><NavLink to="/ticketInfo">Ticket Exchange</NavLink></li>
            <li><NavLink to="/PendingTransactions">View Pending Target</NavLink></li>
            <li><NavLink to="/blockChainView">Block Chain</NavLink></li>
            <li><NavLink to="/setTarget">Change Target</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={TicketInformationForm}/>
            <Route path="/ticketInfo" component={TicketInformationForm}/>
            <Route path="/PendingTransactions" component={PendingTransactions}/>
            <Route path="/blockChainView" component={BlockChainView}/>
            <Route path="/setTarget" component={SetTarget}/>
          </div>
        </div>
        </HashRouter>
    );
  }
}
 
export default NavBar;