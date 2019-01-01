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

import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';

import styles from './styles.scss';

class NumberInput extends React.PureComponent {
  static isNumber(value) {
    const lastCharacter = value.charAt(value.length - 1);
    const digit = Number.parseInt(lastCharacter, 10);
    if (Number.isNaN(digit)) {
      return false;
    }

    return true;
  }

  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.renderIcon = this.renderIcon.bind(this);

    this.state = {
      id: uuidv4(),
      value: '',
    };
  }

  onChange({ target }) {
    const { onChange } = this.props;
    const { value } = target;

    // 0 length probably means that the user has cleared the input.
    if (value.length !== 0
    && !NumberInput.isNumber(value)) {
      return;
    }

    this.setState({
      value,
    }, () => {
      onChange(value);
    });
  }

  renderIcon() {
    const { validationStatus } = this.props;

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
  }

  render() {
    const {
      label,
      maxLength,
      onBlur,
      placeholder,
      validationError,
      validationStatus,
    } = this.props;
    const { id, value } = this.state;

    return (
      <div className={styles.numberInput}>
        <div className={styles.numberInput__field}>
          <label className={styles.numberInput__label} htmlFor={id}>
            {label}

            <div className={styles.numberInput__icon}>
              <input
                className={styles.numberInput__input}
                id={id}
                maxLength={maxLength}
                onBlur={onBlur}
                onChange={this.onChange}
                placeholder={placeholder}
                value={value}
              />

              {this.renderIcon()}
            </div>
          </label>
        </div>

        <div className={classNames({
          [`${styles.numberInput__error}`]: true,
          [`${styles.numberInput__errorVISIBLE}`]: validationStatus === 'error',
        })}
        >
          {validationError}
        </div>
      </div>
    );
  }
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  validationError: PropTypes.string.isRequired,
  validationStatus: PropTypes.oneOf([
    'error',
    'success',
    'validating',
  ]).isRequired,
};

export default NumberInput;