import React, { Component } from 'react';
import './App.css';

class BlockChainView extends Component {
  constructor(props) {
    super(props);
    this.state = { blockChain: [], lastBlock: "" };
  }
  
  getBlockChain = () => {
    fetch('/bc/api/getBlockChain')
      .then(res => res.json())
      .then(bc => this.setState(bc));
  }

  getLastBlock = () => {
    fetch('/bc/api/getlastblock')
      .then(res => res.json())
      .then(block => this.setState(block));
  }

  componentDidMount() {
    this.getBlockChain()
    this.interval = setInterval(() => this.getBlockChain(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="BlockChainView">
        <h1>Block Chain</h1>
        {this.state.blockChain.map(block =>
        <table key={block.index} border="1"><tbody>
        <tr><th>Index</th><td>{block.index}</td></tr>
        <tr><th>Time Stamp</th><td>{block.timeStamp}</td></tr>
        <tr><th>Previous Hash</th><td>{block.previousHash}</td></tr>
        <tr><th>Tix Data</th><td>{block.data}</td></tr>
        <tr><th>Nonce</th><td>{block.nonce}</td></tr>
        <tr><th>Hash</th><td>{block.hash}</td></tr>
        </tbody></table>
        )}
      </div>
    );
  }
}

export default BlockChainView;