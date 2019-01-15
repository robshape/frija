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

import { CONSTANTS } from '../../utils/enums';

class PrivateRoute extends React.PureComponent {
  constructor() {
    super();

    this.onRouteRender = this.onRouteRender.bind(this);
  }

  onRouteRender(props) {
    const { component: Component, data } = this.props;

    if (!data.isAuthenticated) {
      return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_AUTH} />;
    }

    return <Component {...props} />;
  }

  render() {
    const { component, ...props } = this.props;

    return <Route {...props} render={this.onRouteRender} />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func, // Function and class components.
    PropTypes.shape({}), // React.memo() components.
  ]).isRequired,
  data: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PrivateRoute;
