import React from 'react';
import PropTypes from 'prop-types';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

  }

  handleChange=(event)=> {    this.setState({value: event.target.value});  }

  handleSubmit= (event)=> {
    console.log(this.props.state.web3reducer)
    this.altaUsuario(this.state.value)
    event.preventDefault();
  }

  altaUsuario = (idUser) => {
    //const web3 = this.props.state.web3Reducer.web3
    const accounts = this.props.state.web3reducer.accounts;
     const contract = this.props.state.web3reducer.contractClient;
      //contract.options.address = "0xab3B991EaaFDDf4f42F55fC12a8073402989F9fB"
    // Get the value from the contract to prove it worked.
    console.log("atento,que voy a hacer algo")
    console.log(idUser)
      try {
        contract.methods.signup(idUser).send({from: accounts[0]}).then(response=>{
    // Update state with the result.
        // this.setState({ value: response });
        console.log(response)
    
      })
      } catch (error) {
        console.log(error)
        alert(error)
      }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Adress:<input type="text" value={this.state.value} onChange={this.handleChange} /></label>
        <label>Adress:<input type="text" value={this.state.value} onChange={this.handleChange} /></label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NameForm