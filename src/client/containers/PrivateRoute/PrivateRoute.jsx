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
import React, { memo, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { CONSTANTS } from '../../utils/enum';

const PrivateRoute = memo(({ component: Component, data, ...props }) => {
  const onRouteRender = useCallback((routeProps) => {
    if (!data.isAuthenticated) {
      return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_AUTH} />;
    }

    return <Component {...routeProps} />;
  }, [Component, data]);

  return (
    <Route {...props} render={onRouteRender} />
  );
});

PrivateRoute.propTypes = {
  component: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PrivateRoute;
