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

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './InputValidation.scss';
import VALIDATION_STATUS from '../../constants/VALIDATION_STATUS';

const InputValidation = ({ children, status }) => {
  const isVisible = status === VALIDATION_STATUS.ERROR;

  return (
    <p
      className={classNames({
        [`${styles.inputValidation}`]: true,
        [`${styles.inputValidationVISIBLE}`]: isVisible,
      })}
    >
      {children}
    </p>
  );
};

InputValidation.propTypes = {
  children: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    VALIDATION_STATUS.ERROR,
    VALIDATION_STATUS.SUCCESS,
    VALIDATION_STATUS.VALIDATING,
  ]).isRequired,
};

export default InputValidation;
