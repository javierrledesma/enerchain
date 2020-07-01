// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, showNotification, CREATE ,GET_ONE } from 'react-admin';
import { dataProvider } from '../App';


export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
var semaforo = false
        localStorage.setItem('username', username);
        console.log('ME he metido a login')
        console.log(params)

        fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => {
            data.map(m=>{
                if(username==m.username){
                    semaforo=true
                }
            })
            if(semaforo ==false){
                 window.location.reload()
            }

           
        });

        // if(username!="jesus" && username!="admin"  && username!="usuario"){
        //     window.location.reload()
        // }
        
        // accept all username/password combinations
        return Promise.resolve();
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        if(localStorage.getItem('username')!=null){
        localStorage.removeItem('username');
        window.location.reload()
    }
        return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('username')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unknown method');
};