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
import LogInViewLoader from './components/LogInViewLoader';
import NumberInput from './components/NumberInput';
import ROUTER_PATH from '../../enums/ROUTER_PATH';
import Subheading from './components/Subheading';
import useAuthenticatePersonalIdentityNumber from '../../hooks/useAuthenticatePersonalIdentityNumber';
import useInputPersonalIdentityNumber from '../../hooks/useInputPersonalIdentityNumber';
import VALIDATION_STATUS from '../../enums/VALIDATION_STATUS';

const LogInView = ({ graphql }) => {
  const {
    authenticatePersonalIdentityNumber,
    isAuthenticating,
  } = useAuthenticatePersonalIdentityNumber(graphql);
  const {
    onBlur,
    onChange,
    personalIdentityNumber,
    validationStatus,
  } = useInputPersonalIdentityNumber();

  const onSubmit = () => {
    if (validationStatus !== VALIDATION_STATUS.SUCCESS) {
      return;
    }

    authenticatePersonalIdentityNumber(personalIdentityNumber);
  };

  if (graphql.data.isAuthenticated) {
    return (
      <Redirect to={ROUTER_PATH.HOME} />
    );
  }

  if (isAuthenticating) {
    return (
      <LogInViewLoader />
    );
  }

  return (
    <div>
      <Heading>
        Hej,
      </Heading>
      <Subheading>
        identifiera dig med Mobilt BankID
      </Subheading>

      <Form buttonText="Fortsätt" onSubmit={onSubmit}>
        <NumberInput
          labelText="Personnummer"
          maxLength={12}
          onBlur={onBlur}
          onChange={onChange}
          placeholder="ååååmmddxxxx"
          validationStatus={validationStatus}
          validationText="Ange ett giltig personnummer."
        />
      </Form>
    </div>
  );
};

LogInView.propTypes = {
  graphql: PropTypes.shape({
    client: PropTypes.shape({
      mutate: PropTypes.func.isRequired,
    }).isRequired,
    data: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LogInView;