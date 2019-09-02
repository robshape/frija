/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2018 Frija contributors.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see https://www.gnu.org/licenses/.

*/

import { ApolloProvider } from 'react-apollo';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import AuthScene from '../AuthScene';
import HomeScene from '../HomeScene';
import PrivateRoute from '../../containers/PrivateRoute';
import ROUTER_PATH from '../../enums/router-path';
import styles from './AppScene.scss';
import useConfigureGraphQL from '../../hooks/useConfigureGraphQL';

const App = ({ config }) => {
  const client = useConfigureGraphQL(config);

  if (!Object.keys(client).length) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <div className={styles.app} data-testid="app">
        <BrowserRouter>
          <Switch>

            <PrivateRoute component={HomeScene} exact path={ROUTER_PATH.HOME} />
            <Route component={AuthScene} exact path={ROUTER_PATH.AUTHENTICATE} />
            <Redirect to={ROUTER_PATH.HOME} />

          </Switch>
        </BrowserRouter>
      </div>
    </ApolloProvider>
  );
};

App.propTypes = {
  config: PropTypes.shape({
    graphqlUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;