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

import NumberInput from '../NumberInput';
import styles from './CredentialsForm.scss';
import SubmitButton from '../SubmitButton';
import useInputPersonalIdentityNumber from '../../hooks/useInputPersonalIdentityNumber';
import VALIDATION_STATUS from '../../constants/VALIDATION_STATUS';

const CredentialsForm = ({ onSubmit }) => {
  const {
    onBlur,
    onChange,
    personalIdentityNumber,
    validationStatus,
  } = useInputPersonalIdentityNumber();

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (validationStatus !== VALIDATION_STATUS.SUCCESS) return;

    onSubmit(personalIdentityNumber);
  };

  return (
    <form className={styles.credentialsForm} onSubmit={onFormSubmit}>
      <NumberInput
        labelText="Personnummer"
        maxLength={12}
        onBlur={onBlur}
        onChange={onChange}
        placeholder="ååååmmddxxxx"
        validationStatus={validationStatus}
        validationText="Ange ett giltig personnummer."
      />

      <div className={styles.credentialsForm__submit}>
        <SubmitButton>Fortsätt</SubmitButton>
      </div>
    </form>
  );
};

CredentialsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CredentialsForm;
