import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import zxcvbn from 'zxcvbn';
import { Progress } from 'antd';
import 'antd/dist/antd.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {password: '', username:'', output:'', passbox_type:"password", timeout:null};

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeusername = this.handleChangeusername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(event) {
    var evaluation=zxcvbn(event.target.value, [this.state.username]);
    this.setState({password: event.target.value, output:evaluation, passbox_type:"text"});

    function changePassboxType(){
      this.setState({passbox_type:"password"})
      console.log("OK")
    }

    changePassboxType = changePassboxType.bind(this);
    if(this.state.timeout){
      window.clearTimeout(this.state.timeout)
    }
    this.state.timeout=setTimeout(changePassboxType,1200)
  }

  handleChangeusername(event){
    var evaluation=zxcvbn(this.state.password, [event.target.value]);
    this.setState({username: event.target.value, output:evaluation});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    var warning = ""
    var suggestion = ""
    var crack_time=""
    var score=0;

    if (this.state.output && this.state.output.feedback.warning){
      warning = <span>warning: {this.state.output.feedback.warning}<br/></span>
    }

    if (this.state.output){
      crack_time = <span>crack time: {this.state.output.crack_times_display.online_no_throttling_10_per_second}<br/></span>
      score = this.state.output.score
    }

    var passphrase=""
    var passphrase_time=""
    // should generate a random passphrase
    passphrase="My giant pink golem"
    passphrase_time=zxcvbn(passphrase).crack_times_display.online_no_throttling_10_per_second

    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" value={this.state.value} onChange={this.handleChangeusername} />
          </label>
          <br/>
          <label>
            Password:
            <input type={this.state.passbox_type} value={this.state.value} onChange={this.handleChangePassword} />
          </label>
          <br/>
          score: <Progress percent={(score+1)*20} showInfo={false} /> <a href="https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/" target="_blank"><i className="fa fa-question-circle" aria-hidden="true"></i></a>
{ /* will be between 0 and 4*/}
          <br/>
          {crack_time}
          {warning}
          <input type="submit" value="Submit" />
        </form>
        You could use a passphrase, they are <a href="https://xkcd.com/936/" target="_blank">easier to remember and harder to crack</a>: <br/>
        <code>Je.#536t?</code> : 3 years to crack <br/>
        <code>{passphrase}</code> : {passphrase_time} to crack
      </div>
    );
  }
}


export default App;
