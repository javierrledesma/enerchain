import React from 'react'
import { Admin, Resource, AppBar,Layout as Lyt } from 'react-admin';
import getWeb3 from '../utils/getWeb3.js';
// import AcademyContract from '../contracts/Academy.json';
// import StorageContract from '../contracts/SimpleStorage.json';
// import ClientContract from '../contracts/Cliente.json';
import ElectricMeter from '../contracts/ElectricMeter.json'
import TasaKwEther from '../contracts/TasaKwEther.json'
import contractAddresses from '../contractAddresses/addresses.json';
import authProvider from '../dataProviders/authProvider';
import { createHashHistory } from 'history';
// import jesus from "../usuarios/jesus"
// import miguel from '../usuarios/miguel'
// import andres from '../usuarios/andres'
import users from '../usuarios/users'
// import courses from './courses'
import altaUsuario from './altaUsuario'
import usersList from './usersList'
//import myCoursesAsTutor from './myCoursesAsTutor'
import misMedidas from'./medidas'
import misPagos from'./pagosCliente'
import CircularIndeterminate from '../utils/progress'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
export const PostIcon = ImportContactsIcon;


const myTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: { main: '#1A237E' },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,
        textAlign: "center"
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    overrides: {
        MuiButton: { // override the styles of all instances of this component
            root: { // Name of the rule
                color: 'white', // Some CSS
            },
        },
    },
}); 

const CustomAppBar = ({ classes, ...props }) => (
    <AppBar {...props} >
        <div style={{flex:1, textAlignLast: 'center'}} >
         </div>   
    </AppBar>
);
const CustomLayout = props => (
    <Lyt {...props} appBar={CustomAppBar}  />
);


const LayoutContainer = () => (
  
    <Admin  
        theme={myTheme}     
        authProvider={authProvider}
        history={createHashHistory()}
        title="My Admin"
        appLayout={CustomLayout}
        
        >
        
        <Resource name="medidas" options={{ label: 'Mis Medidas' }} {...misMedidas} />
        <Resource name="misPagos" options={{ label: 'Mis Pagos' }} {...misPagos} />
    </Admin> 

);

const LayoutContainer2 = () => (
  
    <Admin  
        theme={myTheme}     
        authProvider={authProvider}
        history={createHashHistory()}
        title="My Admin"
        appLayout={CustomLayout}
        >
        <Resource name="Usuarios" options={{ label: 'Lista Usuarios' }} {...usersList} />
        <Resource name="users" options={{ label: 'Alta Usuario' }} {...altaUsuario} />
    </Admin> 

);

export default class Layout extends React.Component {

  componentDidMount = () => {
    
    users.users.map(user=>{
        if(localStorage.getItem('username')===(user.username)){
            this.props.saveUserInformation(user)
            }
        })
    try {
      // Get network provider and web3 instance.
      getWeb3().then(web3=>{

        var storageAbi = ElectricMeter.abi;
        var storageContractAddress = JSON.stringify(contractAddresses.ElectricMeterAddress).toLowerCase().split("\"")[1];
        var storageContract = new web3.eth.Contract(storageAbi, storageContractAddress)
        this.props.saveContractStorage(storageContract)
        
        var clientAbi = TasaKwEther.abi;
        var clientContractAddress = JSON.stringify(contractAddresses.TasaKwEtherAddress).toLowerCase().split("\"")[1];
        var clientContract = new web3.eth.Contract(clientAbi, clientContractAddress)
        this.props.saveContractClient(clientContract) 
        // Use web3 to get the user's accounts.
        web3.eth.getAccounts().then(accounts => {
            console.log(accounts)

          // Get the contract instance.
          web3.eth.net.getId().then(networkId => {
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.props.saveWeb3(web3);
            this.props.saveAccounts(accounts);
          })
        })
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    
    }
    };

    render() {
     if(this.props.state.web3reducer.web3 && this.props.state.web3reducer.contractStorage && this.props.state.web3reducer.accounts  && this.props.state.web3reducer.contractStorage ){

        if(localStorage.getItem('username')===("admin")){
            return(
                <LayoutContainer2 {...this.props}/>   
            )
        }
        else{
            return(
                <LayoutContainer {...this.props}/>   
            )
        }
      }
      else{
         return(<div><CircularIndeterminate></CircularIndeterminate></div>)
      }
    }
}

