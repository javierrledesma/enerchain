import React from 'react';
import { List, DateField, TextField, ReferenceField} from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { dataProvider } from '../../App';
import { GET_MANY } from 'react-admin';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularIndeterminate from '../../utils/progress'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ipfsAPI from 'ipfs-api'
import TransitionsModal from './modal'
import CustomPaginationActionsTable from './tabla'



class MisPagos extends React.Component{

state={semaforo: false,eventosMedidor:[],tableActive:false,web3:null,balance:'0'}

 componentDidMount() {
 
  var aux=[]

    if(this.props.state.userInformation.user !=null){
      this.getEventosPasados(this.props.state.userInformation.user.id).then(events=>{
          this.setState({ eventosMedidor : events, tableActive: true})
          
            })
      this.getSaldoActual().then(result=>{
        this.setState({balance:result})
      })       
    }
    

    this.setState({semaforo:true})


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
        'Payments',
        {
          filter:{},
          fromBlock: 0,
          toBlock: 'latest'
        },
        (err,events)=>{
            
            eventos=events
        }
      )
      .then(function() {
        var eventosUser=[]
        if(idUser!=null){
        eventos.map(evento=>{
          if (evento.returnValues.idUser===idUser){
            eventosUser.push(evento)
            console.log(eventosUser)
          }
          
        })
        }
        resolve( eventosUser )
      })
    })
  }


  getSaldoActual = () => {
    return new Promise((resolve, reject) => {
      this.props.state.web3reducer.contractStorage.methods.getBalance().call({from:this.props.state.userInformation.user.id},(err, balance) => {
        // console.log({ err, balance})
        if(balance!=null){
          
          resolve(balance.toString())
        }
        else{
          alert('error')
          resolve('0')
        }
      })
     
    })
  }


  injectFounds = () =>{
    console.log('metido')
    try {
      this.props.state.web3reducer.contractStorage.methods.injectFounds().send({from: this.props.state.userInformation.user.id,value:1000000000000000000}).then(response=>{

      console.log(response)
      
  
    })
    } catch (error) {
      console.log(error)
      alert(error)
    }

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
                  Saldo: {this.props.state.web3reducer.web3.utils.fromWei(this.state.balance)} Ether
                  <Button onClick={()=>{this.injectFounds()}}>Injectar fondos</Button>
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

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(MisPagos));



