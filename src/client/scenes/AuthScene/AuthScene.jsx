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
import { getStoredToken, isTokenValid, removeStoredToken } from '../../utils/token';
import Loader from '../../components/Loader';
import LogInView from '../../containers/LogInView';
import styles from './styles.scss';
import { VALIDATE_QUERY } from '../../graphql/queries/token';

class AuthScene extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isValidating: true,
    };
  }

  componentDidMount() {
    this.validateToken();
  }

  async validateToken() {
    const { client } = this.props;

    const token = getStoredToken();
    const isValidToken = isTokenValid(token);
    if (!isValidToken) {
      removeStoredToken();

      this.setState({
        isValidating: false,
      });

      return;
    }

    const { data } = await client.query({
      query: VALIDATE_QUERY,
      variables: {
        token,
      },
    });

    this.setState({
      isValidating: false,
    }, () => {
      if (!data.validate) {
        removeStoredToken();
        return;
      }

      client.writeData({
        data: {
          isAuthenticated: true,
        },
      });
    });
  }

  render() {
    const { data } = this.props;
    const { isValidating } = this.state;

    if (data.isAuthenticated) {
      return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_HOME} />;
    }

    if (isValidating) {
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
