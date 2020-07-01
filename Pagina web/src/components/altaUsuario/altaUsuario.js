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
import { Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CircularIndeterminate from '../../utils/progress'
import SimpleRating from './value'
import Rating  from 'react-rating'

import NameForm from './formulario'
import Formulario2 from './formulario2'

class AltaUsuario extends React.Component{

state={semaforo: false}

 componentDidMount() {
 
  var aux=[]

}

guardar = (datos) => {
  return new Promise((resolve, reject) => {
    this.props.saveUserCourses(datos)
    resolve(true)
  })
}

  comprobar = (idCourse,web3reducer,idUser) => {
    return new Promise((resolve, reject) => {
      console.log(web3reducer,idCourse,idUser)
      
      try {
        web3reducer.academy.methods.getIsSignedup(idUser,idCourse).call({from: web3reducer.accounts[0]}).then(response=>{
          console.log(idCourse)
          // Update state with the result.
          
          resolve(response)
    
      })
      } catch (error) {
        console.log(error)
        reject(false)
      }
      
    })
  }

  comprobarValue = (idCourse,web3reducer,idUser) => {
    return new Promise((resolve, reject) => {
      console.log(web3reducer,idCourse,idUser)
      
      try {
        web3reducer.academy.methods.getFeedback(idUser,idCourse).call({from: web3reducer.accounts[0]}).then(response=>{
          if(response!=0){resolve(response)}
          else{resolve(4)}
    
      })
      } catch (error) {
        console.log(error)
        reject(false)
      }
      
    })
  }

  render(){

    if(!this.state.semaforo){
      return(
        <div >
          <br/>

          <Formulario2  {...this.props}></Formulario2>
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

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(AltaUsuario));




