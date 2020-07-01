import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';

class SimpleRating extends React.Component {
  //const [value, setValue] = React.useState(valor);
  state={value: this.props.value}
  
   valorar = (idCourse,web3Reducer,value) => {
     console.log(idCourse,web3Reducer,value)
    web3Reducer.academy.methods.provideFeedback(idCourse,value).send({from: web3Reducer.accounts[0]}).then(response=>{
          console.log("respuesta metamask",response)
        })
  }

  setValue=(v)=>{
   this.setState({value:v})
   console.log(this.props)
  }

  render() {
    return(
    <div>{console.log("vALooRRRRR",this.props)}
      <Box component="fieldset" mb={2} borderColor="transparent">
        <Typography component="legend">Evaluación</Typography>
        <Rating
          name="simple-controlled"
          value={this.state.value}
          onChange={(event, newValue) => {
            this.setValue(newValue);
            this.valorar(this.props.id,this.props.state.web3reducer,newValue-1)
          }}
        />
      </Box>
      
    </div>
 ) }

}
  
const mapStateToProps = state => {
  return ({
      state
  });
}

export default connect(mapStateToProps, null)(SimpleRating)

