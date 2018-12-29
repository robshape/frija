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

import styles from './styles.scss';

class TextInput extends React.PureComponent {
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

    this.isInputValid = this.isInputValid.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: '',
    };
  }

  onChange({ target }) {
    const { onChange } = this.props;
    const { value } = target;

    if (!this.isInputValid(value)) {
      return;
    }

    this.setState({
      value,
    }, () => {
      onChange(value);
    });
  }

  isInputValid(value) {
    const { type } = this.props;

    // 0 probably means that the user has cleared the input.
    if (value.length === 0) {
      return true;
    }

    if (type === 'number'
    && !TextInput.isNumber(value)) {
      return false;
    }

    return true;
  }

  render() {
    const { caption, maxLength, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.textInput}>
        <div className={styles.textInput__caption}>
          {caption}
        </div>

        <input
          className={styles.textInput__input}
          maxLength={maxLength}
          onChange={this.onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}

TextInput.defaultProps = {
  type: 'text',
};

TextInput.propTypes = {
  caption: PropTypes.string.isRequired,
  maxLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'number',
    'text',
  ]),
};

export default TextInput;
