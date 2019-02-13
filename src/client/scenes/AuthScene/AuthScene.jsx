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
import React, { memo, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { CONSTANTS } from '../../utils/enums';
import { getStoredToken, isTokenValid, removeStoredToken } from '../../utils/token';
import Loader from '../../components/Loader';
import LogInView from '../../containers/LogInView';
import styles from './styles.scss';
import { VALIDATE_QUERY } from '../../graphql/queries/token';

const validateToken = async (client, setIsValidating) => {
  const token = getStoredToken();
  const isValidToken = isTokenValid(token);
  if (!isValidToken) {
    removeStoredToken();

    setIsValidating(false);
    return;
  }

  const { data } = await client.query({
    query: VALIDATE_QUERY,
    variables: {
      token,
    },
  });

  setIsValidating(false);

  if (!data.validate) {
    removeStoredToken();
    return;
  }

  client.writeData({
    data: {
      isAuthenticated: true,
    },
  });
};

const useValidateToken = (client) => {
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    validateToken(client, setIsValidating);
  }, [client]);

  return isValidating;
};

const AuthScene = memo(({ client, data }) => {
  const isValidating = useValidateToken(client);

  if (data.isAuthenticated) {
    return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_HOME} />;
  }

  let child = <LogInView />;
  if (isValidating) {
    child = <Loader />;
  }

  return (
    <div className={styles.authScene}>
      {child}
    </div>
  );
});

AuthScene.propTypes = {
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AuthScene;
