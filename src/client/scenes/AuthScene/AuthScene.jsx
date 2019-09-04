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

import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';

import AuthSceneLoader from './components/AuthSceneLoader';
import LogInView from '../../containers/LogInView';
import ROUTER_PATH from '../../enums/router-path';
import styles from './AuthScene.scss';
import useValidateStoredToken from '../../hooks/useValidateStoredToken';

const AuthScene = ({ graphql }) => {
  const isValidating = useValidateStoredToken(graphql);

  if (graphql.data.isAuthenticated) {
    return (
      <Redirect to={ROUTER_PATH.HOME} />
    );
  }

  if (isValidating) {
    return (
      <AuthSceneLoader />
    );
  }

  return (
    <div className={styles.authScene}>
      <LogInView />
    </div>
  );
};

AuthScene.propTypes = {
  graphql: PropTypes.shape({
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    data: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AuthScene;
