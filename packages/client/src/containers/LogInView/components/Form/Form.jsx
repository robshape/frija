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

import styles from './Form.scss';
import SubmitButton from '../SubmitButton';

const Form = ({ buttonText, children, onSubmit }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      {children}

      <div className={styles.form__submit}>
        <SubmitButton>
          {buttonText}
        </SubmitButton>
      </div>
    </form>
  );
};

Form.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
