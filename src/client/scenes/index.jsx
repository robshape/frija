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

import { BrowserRouter, Route } from 'react-router-dom';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import PropTypes from 'prop-types';
import React from 'react';

import AuthScene from './AuthScene';
import configureGraphQL from '../graphql';
import styles from './styles.scss';

class App extends React.PureComponent {
  componentDidMount() {
    const { config } = this.props;

    configureGraphQL(config);

    library.add(
      faCheck,
      faExclamation,
    );
  }

  render() {
    return (
      <React.StrictMode>
        <div className={styles.app}>
          <BrowserRouter>

            <Route component={AuthScene} exact path="/" />

          </BrowserRouter>
        </div>
      </React.StrictMode>
    );
  }
}

App.propTypes = {
  config: PropTypes.shape({
    graphqlEndpoint: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
