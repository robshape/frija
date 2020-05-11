/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2019 Frija contributors.

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
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import IS_AUTHENTICATED_CLIENT_QUERY from '../../../../graphql/queries/IS_AUTHENTICATED_CLIENT_QUERY';
import ROUTER_PATH from '../../../../constants/ROUTER_PATH';

const PrivateRoute = ({ component: Component, ...props }) => {
  // https://github.com/apollographql/react-apollo/issues/3635/
  const [isAuthenticated, { data }] = useLazyQuery(IS_AUTHENTICATED_CLIENT_QUERY);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) isAuthenticated();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  const onRouteRender = (routeProps) => {
    // Prevent protected Component from rendering until query is done.
    if (!data) {
      return null;
    }

    if (data
    && !data.isAuthenticated) {
      return (
        <Redirect to={ROUTER_PATH.AUTHENTICATE} />
      );
    }

    return (
      <Component {...routeProps} />
    );
  };

  return (
    <Route {...props} render={onRouteRender} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
