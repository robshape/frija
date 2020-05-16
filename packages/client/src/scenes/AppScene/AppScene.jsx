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

import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import AuthScene from '../AuthScene';
import ErrorBoundary from './components/ErrorBoundary';
import HomeScene from '../HomeScene';
import PrivateRoute from './components/PrivateRoute';
import Router from './components/Router';
import ROUTER_PATH from '../../constants/ROUTER_PATH';
import styles from './AppScene.scss';
import useConfigureGraphQL from './hooks/useConfigureGraphQL';

const AppScene = () => {
  const client = useConfigureGraphQL();

  if (!Object.keys(client).length) return null;

  return (
    <ApolloProvider client={client}>
      <div className={styles.app} data-testid="app">
        <ErrorBoundary>
          <Router>

            <PrivateRoute component={HomeScene} exact path={ROUTER_PATH.HOME} />
            <Route component={AuthScene} exact path={ROUTER_PATH.AUTHENTICATE} />
            <Redirect to={ROUTER_PATH.HOME} />

          </Router>
        </ErrorBoundary>
      </div>
    </ApolloProvider>
  );
};

export default AppScene;
