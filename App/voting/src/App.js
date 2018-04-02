import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor () {
    super()
    this.state = {
      voteNopadon: 0,
      voteNop: 0,
      voteTest: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.getResourceVoting()
  }

  getResourceVoting() {
      axios.get('http://localhost:3001/voting/Nopadon')
      .then(response => {
        console.log('response',response)
        this.setState({
          voteNopadon: response.data.voteCount
        })
      })
      axios.get('http://localhost:3001/voting/Nop')
      .then(response => {
        console.log('response',response)
        this.setState({
          voteNop: response.data.voteCount
        })
      })
      axios.get('http://localhost:3001/voting/Test')
      .then(response => {
        console.log('response',response)
        this.setState({
          voteTest: response.data.voteCount
        })
      })
  }

  handleClick (candidateName) {
    axios.post('http://localhost:3001/voting/' + candidateName)
    .then(response => {
      console.log(response)
      this.getResourceVoting()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Ether</h1>
        </header>
        <center>
          <div className="table-responsive" style={{width:'70%', marginTop:10}}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Votes Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nopadon</td>
                  <td id="candidate-1">{this.state.voteNopadon}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => this.handleClick('Nopadon')}>Vote</button>
                  </td>
                </tr>
                <tr>
                  <td>Nop</td>
                  <td id="candidate-2">{this.state.voteNop}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => this.handleClick('Nop')}>Vote</button>
                  </td>
                </tr>
                <tr>
                  <td>Test</td>
                  <td id="candidate-3">{this.state.voteTest}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => this.handleClick('Test')}>Vote</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </center>

      </div>
    );
  }
}

export default App;
