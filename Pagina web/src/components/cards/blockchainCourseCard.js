import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import blockchainImg from '../../images/blockchain.jpg';
import EditButton  from 'react-admin'
const styles = theme => ({
  card: {
    maxWidth: 400,
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
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});



const Web3 = require('web3')
//var url = 'https://ropsten.infura.io/v3/8015a17b845f44e38540aff796f9d68c'
//var url='HTTP://127.0.0.1:8545'
var Tx = require('ethereumjs-tx')
//const web3=new Web3(url)
var web3 = new Web3('http://127.0.0.1:8545')
const account1='0x7ce248cad8a5fa225719a75c6292f77f2cdb3cef'
const account2='0x191e7856cf470a1e1858988579acb21cd3ba7e23'

const privateKey1=Buffer.from('f5efd86150f7bd33a618af2f5186ef634903166b0dc24dd9c174f027169d2fd3','hex')
const privateKey2=Buffer.from('b60c95c78c77f87b9bfab89d1eb5256b0a239b30927b59e616dec38807e7bdb0')

var AcademyArtifact = require('../../variables/ABIAcademy.json')
var AcademyAbi = AcademyArtifact.abi



class CourseCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Course" className={classes.avatar}>
              B
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Introducción a Blockchain"
          subheader="25 de Septiembre 2019"
        />
        <CardMedia
          className={classes.media}
          image={blockchainImg}
          title="Introducción a Blockchain"
        />
        <CardContent>
          <Typography component="p">
            Aprende los fundamentos de la tecnología blockchain y descubre por qué ha llegado a formar
            parte de la agenda de muchos departamentos de innovación en innumerables empresas.
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Detalles del curso:
            </Typography>
            <Typography paragraph>
              Blablablablabla.
            </Typography>
            <Typography paragraph>
              Blablablablabla.
            </Typography>
          </CardContent>
        </Collapse>
        {/* <button onClick={()=> abrirMetamask() }>{JSON.stringify(this.props.state)}</button> */}
      </Card>
      
    );
  }
}
const abrirMetamask = () => {

const contractAdress="0xa8dfb450842082E9cf1D8EA40C090bEf2887aDbB"

console.log(web3)
const dapptokenContract = new web3.eth.Contract(AcademyAbi,contractAdress)
console.log(dapptokenContract)

dapptokenContract.methods.isOwner().call({from:"0x1E83E1bF0573f690b92f4bEAB96bc9aDEe76E788"},(err,owner)=>{
  console.log({err,owner})
})

dapptokenContract.methods.getTokenAddress().call({from:account1},(err, res) => {
  console.log({err,res})
})

dapptokenContract.methods.getTokenAddress().call().then(res=>{console.log(res)})


// const dapptokenContract = web3.eth.Contract(contractABI,contractAdress);
//   web3.eth.getTransactionCount(account1,(err,txcount)=>{
// 	  console.log(txcount)
// 	  const txObject ={
//       from:account1,
// 		nonce: web3.utils.toHex(txcount),
// 		value: web3.utils.toHex(web3.utils.toWei('0.001', 'ether')),
// 		gaslimit: web3.utils.toHex(1000000) ,
// 		gasprice: web3.utils.toHex(web3.utils.toWei('10','gwei')),
// 		to: account2
// 	 }
// 	 console.log("nonce:"+JSON.stringify(txObject))
		
// 		web3.eth.sendTransaction(txObject,(err,txHash)=>{
// 		 // waitfortxtobemined(res)
// 		 console.log(txHash)

// 	})
 
// })
}

CourseCard.propTypes = {
  classes: PropTypes.object.isRequired,
};



const mapStateToProps = state => {
  return ({
      state: state.courseAc
  });
} 

export default connect(mapStateToProps,null)(withStyles(styles)(CourseCard));