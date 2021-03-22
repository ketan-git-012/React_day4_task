import React from 'react';
import './App.css';
import Welcome from './components/textField/index';
import styles from './components/textField/style';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      valid : "",
      invalid : "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name] : event.target.value});
    this.isValid(this.state);
  }

  isValid(arg){
    arg.valid !== '' ? this.setState({ validClass : "success"}) : this.setState({ validClass : "error"});
    Number.isInteger(arg.invalid)>=0 && !isNaN(parseInt(arg.invalid)) ? this.setState({inValidClass : "success"}) : this.setState({inValidClass : "error"});
  }

  render(){
    return(
    <>
      <Welcome validClass={this.state.validClass} valid={this.state.valid} invalid={this.state.invalid} inValidClass={this.state.inValidClass} onChange={this.handleChange} stylesheet={styles} ></Welcome>
    </>
    );
  }
}
export default App;