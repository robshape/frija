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

import Form from './components/Form';
import Heading from './components/Heading';
import Loader from '../../components/Loader';
import NumberInput from './components/NumberInput';
import { ROUTER_PATH } from '../../utils/enum';
import styles from './styles.scss';
import Subheading from './components/Subheading';
import { useAuthenticatePersonalIdentityNumber, useInputPersonalIdentityNumber } from './hooks';

const LogInView = ({ authenticate, client, data }) => {
  const {
    authenticatePersonalIdentityNumber,
    isAuthenticating,
  } = useAuthenticatePersonalIdentityNumber(client, authenticate);
  const {
    onBlur: onNumberInputBlur,
    onChange: onNumberInputChange,
    personalIdentityNumber,
    validationStatus,
  } = useInputPersonalIdentityNumber();

  const onFormSubmit = () => {
    if (validationStatus !== 'success') {
      return;
    }

    authenticatePersonalIdentityNumber(personalIdentityNumber);
  };

  if (data.isAuthenticated) {
    return <Redirect to={ROUTER_PATH.HOME} />;
  }

  if (isAuthenticating) {
    return (
      <div className={styles.logInView}>
        <Loader>
          Väntar på svar från Mobilt BankID... Vänligen starta BankID-appen i din mobila enhet.
        </Loader>
      </div>
    );
  }

  return (
    <div className={styles.logInView}>
      <Heading>
        Hej,
      </Heading>
      <Subheading>
        identifiera dig med Mobilt BankID
      </Subheading>

      <Form buttonText="Fortsätt" onSubmit={onFormSubmit}>
        <NumberInput
          labelText="Personnummer"
          maxLength={12}
          onBlur={onNumberInputBlur}
          onChange={onNumberInputChange}
          placeholder="ååååmmddxxxx"
          validationStatus={validationStatus}
          validationText="Ange ett giltig personnummer."
        />
      </Form>
    </div>
  );
};

LogInView.propTypes = {
  authenticate: PropTypes.func.isRequired,
  client: PropTypes.shape({
    writeData: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default LogInView;
