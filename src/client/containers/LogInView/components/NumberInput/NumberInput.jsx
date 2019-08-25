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

import Icon from '../Icon';
import InputValidation from '../InputValidation';
import Label from '../Label';
import styles from './NumberInput.scss';
import useId from '../../../../hooks/useId';
import useInputNumber from '../../../../hooks/useInputNumber';
import VALIDATION_STATUS from '../../../../enums/validation-status';

const NumberInput = ({
  labelText,
  maxLength,
  onBlur,
  onChange,
  placeholder,
  validationStatus,
  validationText,
}) => {
  const id = useId();
  const { onChange: onInputNumberChange, value } = useInputNumber(onChange);

  return (
    <div className={styles.numberInput}>
      <div className={styles.numberInput__field}>

        <Label forId={id} text={labelText}>
          <div className={styles.numberInput__icon}>
            <input
              className={styles.numberInput__input}
              id={id}
              maxLength={maxLength}
              onBlur={onBlur}
              onChange={onInputNumberChange}
              placeholder={placeholder}
              value={value}
            />

            <Icon icon={validationStatus} />
          </div>
        </Label>

      </div>

      <InputValidation status={validationStatus}>
        {validationText}
      </InputValidation>
    </div>
  );
};

NumberInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  validationStatus: PropTypes.oneOf([
    VALIDATION_STATUS.ERROR,
    VALIDATION_STATUS.SUCCESS,
    VALIDATION_STATUS.VALIDATING,
  ]).isRequired,
  validationText: PropTypes.string.isRequired,
};

export default NumberInput;
