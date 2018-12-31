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

import React from 'react';

import Form from './components/Form';
import Heading from './components/Heading';
import NumberInput from './components/NumberInput';
import Subheading from './components/Subheading';

export default class LoginFormView extends React.PureComponent {
  static isLuhnChecksumValid(number) {
    const digits = number
      .split('')
      .reverse()
      .map(digit => Number.parseInt(digit, 10));
    const lastDigit = digits.splice(0, 1)[0];

    const sum = digits.reduce((acc, cur, idx) => {
      if (idx % 2 !== 0) {
        return acc + cur;
      }

      return acc + ((cur * 2) % 9) || 9;
    }, 0);

    return (sum + lastDigit) % 10 === 0;
  }

  static isPersonalIdentityNumber(number) {
    // Is it 10 (yymmddxxxx) or 12 (yyyymmddxxxx) digits?
    if (number.length !== 10
    && number.length !== 12) {
      return false;
    }

    // Is the Luhn checksum valid?
    const luhnNumber = number.length === 12 // yymmddxxxx
      ? number.substring(2)
      : number;
    if (!LoginFormView.isLuhnChecksumValid(luhnNumber)) {
      return false;
    }

    // Is the date valid? Crude and probably unnecessary if the Luhn checksum is valid...
    const dateNumber = number.length === 12 // yymmdd
      ? number.substring(2, 8)
      : number.substring(0, 6);
    const dateFormat = `${dateNumber.substring(0, 2)}-${dateNumber.substring(2, 4)}-${dateNumber.substring(4, 6)}`; // yy-mm-dd
    const date = Date.parse(dateFormat);
    if (Number.isNaN(date)) {
      return false;
    }

    return true;
  }

  constructor() {
    super();

    this.onNumberInputBlur = this.onNumberInputBlur.bind(this);
    this.onNumberInputChange = this.onNumberInputChange.bind(this);
    this.validationStatus = this.validationStatus.bind(this);

    this.state = {
      isLogInValid: false,
    };
  }

  onNumberInputBlur() {
    const { isLogInValid } = this.state;

    if (!isLogInValid) {
      this.setState({
        showError: true,
      });
    }
  }

  onNumberInputChange(value) {
    if (!LoginFormView.isPersonalIdentityNumber(value)) {
      return this.setState({
        isLogInValid: false,
      });
    }

    return this.setState({
      isLogInValid: true,
      showError: false,
    });
  }

  validationStatus() {
    const { isLogInValid, showError } = this.state;

    if (isLogInValid) {
      return 'success';
    }

    if (showError) {
      return 'error';
    }

    return 'validating';
  }

  render() {
    const validationStatus = this.validationStatus();

    return (
      <div>
        <Heading>
          Hej,
        </Heading>
        <Subheading>
          identifiera dig med Mobilt BankID
        </Subheading>

        <Form buttonText="Fortsätt" onSubmit={() => {}}>
          <NumberInput
            label="Personnummer"
            maxLength={12}
            onBlur={this.onNumberInputBlur}
            onChange={this.onNumberInputChange}
            placeholder="ååååmmddxxxx"
            type="number"
            validationError="Ange ett giltig personnummer."
            validationStatus={validationStatus}
          />
        </Form>
      </div>
    );
  }
}
