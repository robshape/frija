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
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';

import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import ROUTER_PATH from '../../constants/ROUTER_PATH';
import styles from './AppScene.scss';

const AuthScene = lazy(() => import(/* webpackChunkName: "AuthScene" */ '../AuthScene'));
const HomeScene = lazy(() => import(/* webpackChunkName: "HomeScene" */ '../HomeScene'));

const AppScene = ({ client }) => (
  <ApolloProvider client={client}>
    <div className={styles.app} data-testid="app">
      {/* Suspense, with a fallback, is necessary for code splitting / lazy loading. */}
      <Suspense fallback={null}>
        <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <PrivateRoute component={HomeScene} exact path={ROUTER_PATH.HOME} />
              <Route component={AuthScene} exact path={ROUTER_PATH.AUTHENTICATE} />
              <Redirect to={ROUTER_PATH.HOME} />
            </Switch>
          </BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </div>
  </ApolloProvider>
);

AppScene.propTypes = {
  client: PropTypes.shape({}).isRequired,
};

export default AppScene;
