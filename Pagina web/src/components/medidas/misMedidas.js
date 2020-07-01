import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CircularIndeterminate from '../../utils/progress'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ipfsAPI from 'ipfs-api'
import TransitionsModal from './modal'
import CustomPaginationActionsTable from './tabla'


class MisMedidas extends React.Component{

state={semaforo: false,eventosMedidor:[],tableActive:false,web3:null, medidaActual:0}

 componentDidMount() {
 
  var aux=[]
  
    this.getMedidaActual().then(response => {
      this.setState({medidaActual:response})
    })

    var Web3 = require('web3');
    var rpcURL = 'HTTP://127.0.0.1:8545';
    var web3 = new Web3(rpcURL);
    this.setState({web3:web3})
  if(this.props.state.userInformation.user !=null){
    this.getEventosPasados(this.props.state.userInformation.user.id).then(events=>{
         this.setState({ eventosMedidor : events, tableActive: true})
          this.setState({semaforo:true})
           })    
}
  

}

getMedidaActual = () => {
  return new Promise((resolve, reject) => {
    this.props.state.web3reducer.contractStorage.methods.getCount(this.props.state.userInformation.user.id).call({from:this.props.state.userInformation.user.id},(err, balance) => {
      // console.log({ err, balance})
      if(balance!=null){
        console.log('El numerito eeeessss: '+balance.toString())
        resolve(balance.toString())
      }
      else{
        alert('error')
        resolve(0)
      }
    })
   
  })
}
   verFecha = (time) =>{
    var f = new Date()
    //console.log(f.getTime())
      var m =f.setTime(time)
      f.setTime(time * 1000 +3600000)
      return <ul>{f.getUTCDate()}/{f.getUTCMonth()+1}/{f.getFullYear()}    {f.getUTCHours()+1}:{f.getUTCMinutes()}:{f.getUTCSeconds()}</ul>
      //return <ul>{f.getTime()}</ul>
  }

  getEventosPasados = (idUser) => {
    return new Promise((resolve, reject) => {

      var eventos=[]
      this.props.state.web3reducer.contractStorage.getPastEvents(
        'IncrementCount',
        {
          filter:{},
          fromBlock: 0,
          toBlock: 'latest'
        },
        (err,events)=>{
            console.log(events)
            eventos=events
        }
      )
      .then(function() {
        var eventosUser=[]
        if(idUser!=null){
        eventos.map(evento=>{
          if (evento.returnValues.idUser===idUser){
            eventosUser.push(evento)
          }
          
        })
        }
        resolve( eventosUser.reverse() )
      })
    })
  }

  render(){

    if(this.state.semaforo){

      
       return (
        <div >
          <br />

          <div>
            <div style={{ backgroundColor: 'blue' }} >
              <AppBar position="static">
                <Toolbar>
                  Medida Actual: {this.state.medidaActual} W
            </Toolbar>
              </AppBar>
            </div>
            <div >
              {this.state.tableActive &&
              <CustomPaginationActionsTable tabla={this.state.eventosMedidor}></CustomPaginationActionsTable>
                }
            </div>
          </div>
          
        </div>
       );
    }
    else{

      return(
      <div><CircularIndeterminate></CircularIndeterminate></div>
    )}
  }
}

const mapStateToProps = state => {
  return ({
      state
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserCourses: (myCourses) => dispatch({
      type: 'SAVE_USER_COURSES',
      payload: myCourses
    })
  }
}

const style = theme => ({
    card: {
      maxWidth: 400,
      minHeight: 300,
    margin: '0.8em',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#DEEEFF'
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    iconFilled: {
      color: '#ff6d75',
    },
    iconHover: {
      color: '#ff3d47',
    },
    title:{
      fontSize:'140%'
    },
    titleCard:{
      fontSize:'140%'
    }
  });

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(MisMedidas));



