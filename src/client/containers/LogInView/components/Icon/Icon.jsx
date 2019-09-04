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

import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import ICON from '../../../../enums/ICON';
import styles from './Icon.scss';

const Icon = ({ icon }) => {
  switch (icon) {
    case ICON.ERROR:
      return (
        <FontAwesomeIcon className={styles.icon__error} data-testid="icon__error" icon={faExclamation} />
      );

    case ICON.SUCCESS:
      return (
        <FontAwesomeIcon className={styles.icon__success} data-testid="icon__success" icon={faCheck} />
      );

    default:
      return null;
  }
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
