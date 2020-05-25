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
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import ROUTER_PATH from '../../../../constants/ROUTER_PATH';
import SceneLoader from '../../../../components/SceneLoader';
import useIsAuthenticatedClientQuery from '../../../../hooks/useIsAuthenticatedClientQuery';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { data, loading } = useIsAuthenticatedClientQuery();

  const onRouteRender = (routeProps) => {
    if (loading) return <SceneLoader />;

    if (!data.isAuthenticated) return <Redirect to={ROUTER_PATH.AUTHENTICATE} />;

    return <Component {...routeProps} />;
  };

  return <Route {...props} render={onRouteRender} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
};

export default PrivateRoute;
