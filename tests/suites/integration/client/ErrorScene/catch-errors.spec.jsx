/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2020 Frija contributors.

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
import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorBoundary from '../../../../../packages/client/src/scenes/AppScene/components/ErrorBoundary';

const ComponentWithError = ({ onSetError }) => {
  const [error, setError] = useState(false);

  const ErrorComponent = () => {
    onSetError();
    return null;
  };

  const onClick = () => setError(true);

  return (
    <ErrorBoundary>
      {!!error && <ErrorComponent />}

      <button onClick={onClick} type="button">
        Set error
      </button>
    </ErrorBoundary>
  );
};

ComponentWithError.defaultProps = {
  onSetError: () => {},
};

ComponentWithError.propTypes = {
  onSetError: PropTypes.func,
};

it('should show the Error scene if a function is broken', () => {
  global.console.error = jest.fn();

  const onSetError = () => [].notAFunction();
  render(<ComponentWithError onSetError={onSetError} />);

  expect(screen.queryByText(/Något blev fel/))
    .not
    .toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Set error' }));

  expect(screen.getByText(/Något blev fel/)).toBeInTheDocument();
  expect(global.console.error).toHaveBeenCalledTimes(2);
});

it('should show the Error scene if an error is thrown', () => {
  global.console.error = jest.fn();

  const onSetError = () => {
    throw new Error('💥');
  };
  render(<ComponentWithError onSetError={onSetError} />);

  expect(screen.queryByText(/Något blev fel/))
    .not
    .toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Set error' }));

  expect(screen.getByText(/Något blev fel/)).toBeInTheDocument();
  expect(global.console.error).toHaveBeenCalledTimes(2);
});
