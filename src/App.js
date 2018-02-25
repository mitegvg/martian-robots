import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Input } from 'reactstrap';
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
        <Row>
          <Col xs="6">
          <div className="world-form-container">
          <br/>
            <p >
              <Input placeholder="X,Y coordinates of the north-east corner" value={this.state.world} onChange={this.handleChangeWorld}/>
            </p>
            <p>
              <Button color="primary" onClick={this.handleSetWorld}>Set World Margins</Button>
            </p>
          </div>
          <div className="commands-form-container">
            <p >
              <Input placeholder="Initial position of robot (Use uppercase for direction)" value={this.state.commandFirst} onChange={this.handleChangeCommandFirst}/>
            </p>
            <p>
              <Input placeholder="Commands for robot (Use uppercase) " value={this.state.commandSecond} onChange={this.handleChangeCommandSecond}/>
            </p>
            <p>
              <Button  color="primary" onClick={this.handleSendCommand}>Send command</Button>
            </p>
          </div>
          </Col>
          <Col xs="6">
          <div id="output-container" className="output-container">
          <br/>
            <h4>Output</h4>
            {outputLines}
          </div>
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
