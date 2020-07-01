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


class Usuarios extends React.Component{

state={semaforo: false, usuarios:[]}

 componentDidMount() {
 
 
    dataProvider(GET_MANY,'users',{}).then(users=>{
      this.props.saveUsers(users.data) 
      console.log(this.props)
      this.setState({semaforo:true})
    })
//  }else {
  
//   window.location.reload()
// }

}

  render(){

    if(this.state.semaforo){
      return(
        <div >
          <br/>
            <CommentGridPresencial {...this.props} ></CommentGridPresencial>
        </div>
      );
    }
    else{
      return(
      <div>
        <CircularIndeterminate></CircularIndeterminate>
      </div>
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
    saveUsers: (users) => dispatch({
      type: 'SAVE_USER_LIST',
      payload: users
    })
  }
}

const style = theme => ({
    card: {
      maxWidth: 400,
      minHeight: 200,
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

export default withStyles(style)(connect(mapStateToProps, mapDispatchToProps)(Usuarios));

const CommentGridPresencial = ({ state,classes}) => (
  <div style={{ margin: '1em', marginTop: '-40px' }}>
    <Typography className={classes.title} variant='h2' style={{ margin: '1em' }}>Lista de usuarios</Typography>
      {state.userInformation.saveUsers.map(usuario => 
        <Card key={usuario.id} className={classes.card}>
          <CardContent>
            nombre:{usuario.name}
            <br/>
            email:{usuario.email}
            <br/>
            EthereumAdress: {usuario.id}
          </CardContent>
        </Card>
      )}
  </div>
  );




