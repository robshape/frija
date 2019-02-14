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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, {
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';
import uuidv4 from 'uuid/v4';

import InputValidation from '../InputValidation';
import Label from '../Label';
import styles from './styles.scss';

const useNumberInput = (onChangeCallback) => {
  const [value, setValue] = useState('');

  const id = useMemo(
    () => uuidv4(),
    [],
  );

  const isNumber = (input) => {
    const lastCharacter = input.charAt(input.length - 1);
    const digit = Number.parseInt(lastCharacter, 10);
    if (Number.isNaN(digit)) {
      return false;
    }

    return true;
  };

  const onChange = useCallback(({ target }) => {
    // 0 length probably means that the user has cleared the input.
    if (target.value.length !== 0
    && !isNumber(target.value)) {
      return;
    }

    setValue(target.value);

    onChangeCallback(target.value);
  }, [onChangeCallback]);

  return {
    id,
    onChange,
    value,
  };
};

const NumberInput = memo(({
  labelText,
  maxLength,
  onBlur,
  onChange,
  placeholder,
  validationStatus,
  validationText,
}) => {
  const { id, onChange: onInputChange, value } = useNumberInput(onChange);

  const renderIcon = useMemo(() => {
    if (validationStatus === 'error') {
      return (
        <FontAwesomeIcon
          className={styles.numberInput__iconExclamation}
          icon="exclamation"
        />
      );
    }

    if (validationStatus === 'success') {
      return <FontAwesomeIcon className={styles.numberInput__iconCheck} icon="check" />;
    }

    return null;
  }, [validationStatus]);

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
              onChange={onInputChange}
              placeholder={placeholder}
              value={value}
            />

            {renderIcon}
          </div>
        </Label>

      </div>

      <InputValidation status={validationStatus}>
        {validationText}
      </InputValidation>
    </div>
  );
});

NumberInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  validationStatus: PropTypes.oneOf([
    'error',
    'success',
    'validating',
  ]).isRequired,
  validationText: PropTypes.string.isRequired,
};

export default NumberInput;
