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

import { CONSTANTS } from '../../utils/enums';
import Loader from '../../components/Loader';
import LogInView from '../../views/LogInView';
import styles from './styles.scss';
import { VALIDATE_QUERY } from '../../graphql/queries/token';

class AuthScene extends React.PureComponent {
  static decodeTokenPayload(token) {
    const payload64 = token.split('.')[1];
    const payload = atob(payload64);
    return JSON.parse(payload);
  }

  static isTokenDateValid(token) {
    const date = Date.now() / 1000;
    const { exp } = AuthScene.decodeTokenPayload(token);
    if (date > exp) {
      return false;
    }

    return true;
  }

  constructor() {
    super();

    this.validateToken = this.validateToken.bind(this);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.validateToken();
  }

  validateToken() {
    const { client } = this.props;

    const token = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN);
    if (!token
    || !AuthScene.isTokenDateValid(token)) {
      sessionStorage.removeItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN);
      return;
    }

    this.setState({
      isLoading: true,
    }, async () => {
      const { data } = await client.query({
        query: VALIDATE_QUERY,
        variables: {
          token,
        },
      });

      this.setState({
        isLoading: false,
      }, () => {
        if (!data.validate) {
          sessionStorage.removeItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN);
          return;
        }

        client.writeData({
          data: {
            isAuthenticated: true,
          },
        });
      });
    });
  }

  render() {
    const { data } = this.props;
    const { isLoading } = this.state;

    if (data.isAuthenticated) {
      return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_HOME} />;
    }

    if (isLoading) {
      return (
        <div className={styles.authScene}>
          <Loader />
        </div>
      );
    }

    return (
      <div className={styles.authScene}>
        <LogInView />
      </div>
    );
  }
}

AuthScene.propTypes = {
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AuthScene;
