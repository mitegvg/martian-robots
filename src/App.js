import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      world:'',
      commandFirst:'',
      commandSecond:'',
      output:[]
    };
    this.handleSendCommand = this.handleSendCommand.bind(this);
    this.handleSetWorld = this.handleSetWorld.bind(this);
    this.handleChangeWorld = this.handleChangeWorld.bind(this);
    this.handleChangeCommandFirst = this.handleChangeCommandFirst.bind(this);
    this.handleChangeCommandSecond = this.handleChangeCommandSecond.bind(this);
  }
  handleSetWorld(event){
    let that = this;
    axios.post('http://localhost:3015/set-world',{
          world: that.state.world
        }).then(function (response) {
          let outputArr = that.state.output;
          outputArr.push(response.data);
          that.setState({output: outputArr });
        })
        .catch(function (response) {
          let outputArr = that.state.output;
          outputArr.push(response.data);
          that.setState({output: outputArr });
        });          
  }

  handleSendCommand(event){
    let that = this;
    axios.post('http://localhost:3015/command',{
          commandFirst: this.state.commandFirst,
          commandSecond: this.state.commandSecond
        }).then(function (response) {
          let outputArr = that.state.output;
          outputArr.push(response.data.location);
          console.log(response.data.trail);
          that.setState({output: outputArr });
        })
        .catch(function (response) {
          let outputArr = that.state.output;
          outputArr.push(response.data.location);
          that.setState({output: outputArr });
        });
  }

  handleChangeWorld(event) {
    this.setState({world: event.target.value});
  }
  handleChangeCommandFirst(event) {
    this.setState({commandFirst: event.target.value});
  }
  handleChangeCommandSecond(event){
    this.setState({commandSecond: event.target.value});
  }

  render() {
    const outputLines = this.state.output.map((line) =>
      <div>{line}</div>
    );
    return (
      <div  className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to Mars</h1>
        </header>
        <Container>
          <Col xs="6">
          </Col>
          <Col xs="6">
          <div className="world-form-container">
            <p >
              <input value={this.state.world} onChange={this.handleChangeWorld}/>
            </p>
            <p>
              <button onClick={this.handleSetWorld}>Set World Margins</button>
            </p>
          </div>
          <div className="commands-form-container">
            <p >
              <input value={this.state.commandFirst} onChange={this.handleChangeCommandFirst}/>
            </p>
            <p>
              <input value={this.state.commandSecond} onChange={this.handleChangeCommandSecond}/>
            </p>
            <p>
              <button onClick={this.handleSendCommand}>Send command</button>
            </p>
          </div>
          <div id="output-container" className="output-container">
            <h4>Output</h4>
            {outputLines}
          </div>
          </Col>
        </Container>
      </div>
    );
  }
}

export default App;
