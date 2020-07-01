import React from 'react';
import { Provider, connect } from 'react-redux';
import { createHashHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import { bindActionCreators } from 'redux';
import jsonServerProvider from 'ra-data-json-server';
import createAdminStore from './store/createAdminStore';
import authProvider from './dataProviders/authProvider';

// action creators
import * as actionCreators from './actions/actionCreators';

import Layout from './components/Layout'
// side effects
export const dataProvider = jsonServerProvider('http://localhost:3001');
const history = createHashHistory();

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Layout)

const AppProvider = () => (
  
  <Provider
    store={createAdminStore({
      authProvider,
      dataProvider,
      //i18nProvider,
      history,
    })}>

    <App 
      authProvider={authProvider}
      history={history}
      title="My Admin"
    >

    </App>
  </Provider>
);


export default AppProvider;