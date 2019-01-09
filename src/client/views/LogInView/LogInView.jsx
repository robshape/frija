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
import { Redirect } from 'react-router-dom';

import { CONSTANTS } from '../../utils/enums';
import Form from './components/Form';
import Heading from './components/Heading';
import Loader from './components/Loader';
import NumberInput from './components/NumberInput';
import styles from './styles.scss';
import Subheading from './components/Subheading';

class LogInView extends React.PureComponent {
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
    if (!LogInView.isLuhnChecksumValid(luhnNumber)) {
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

    this.getToken = this.getToken.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onNumberInputBlur = this.onNumberInputBlur.bind(this);
    this.onNumberInputChange = this.onNumberInputChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.saveToken = this.saveToken.bind(this);
    this.validationStatus = this.validationStatus.bind(this);

    this.state = {
      isAuthenticated: false,
      isLoading: false,
      personalNumber: '',
      showError: false,
    };
  }

  async onFormSubmit() {
    const { personalNumber } = this.state;

    if (!personalNumber) {
      return;
    }

    this.setState({
      isLoading: true,
    }, this.getToken);
  }

  onNumberInputBlur() {
    const { personalNumber } = this.state;

    if (!personalNumber) {
      this.setState({
        showError: true,
      });
    }
  }

  onNumberInputChange(value) {
    if (!LogInView.isPersonalIdentityNumber(value)) {
      return this.setState({
        personalNumber: '',
      });
    }

    return this.setState({
      personalNumber: value,
      showError: false,
    });
  }

  async getToken() {
    const { logIn } = this.props;
    const { personalNumber } = this.state;

    const response = await logIn({
      variables: {
        personalNumber,
      },
    });

    this.saveToken(response);

    this.setState({
      isAuthenticated: true,
      isLoading: false,
    });
  }

  saveToken({ data }) {
    const { client } = this.props;

    sessionStorage.setItem(CONSTANTS.SESSION_STORAGE_KEY_NAME_TOKEN, data.logIn.token);

    client.writeData({
      data: {
        isAuthenticated: true,
      },
    });
  }

  validationStatus() {
    const { personalNumber, showError } = this.state;

    if (personalNumber) {
      return 'success';
    }

    if (showError) {
      return 'error';
    }

    return 'validating';
  }

  renderForm() {
    const validationStatus = this.validationStatus();

    return (
      <div className={styles.logInView}>
        <Heading>
          Hej,
        </Heading>
        <Subheading>
          identifiera dig med Mobilt BankID
        </Subheading>

        <Form buttonText="Fortsätt" onSubmit={this.onFormSubmit}>
          <NumberInput
            labelText="Personnummer"
            maxLength={12}
            onBlur={this.onNumberInputBlur}
            onChange={this.onNumberInputChange}
            placeholder="ååååmmddxxxx"
            validationStatus={validationStatus}
            validationText="Ange ett giltig personnummer."
          />
        </Form>
      </div>
    );
  }

  render() {
    const { isAuthenticated, isLoading } = this.state;

    if (isAuthenticated) {
      return <Redirect to={CONSTANTS.REACT_ROUTER_PATH_HOME} />;
    }

    if (isLoading) {
      return (
        <div className={styles.logInView}>
          <Loader>
            Väntar på svar från BankID... Vänligen starta BankID-appen i din mobila enhet.
          </Loader>
        </div>
      );
    }

    return this.renderForm();
  }
}

LogInView.propTypes = {
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
  logIn: PropTypes.func.isRequired,
};

export default LogInView;
