/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2019 Frija contributors.

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

import { useCallback, useState } from 'react';

import { isPersonalIdentityNumber } from '../../utils/number';
import { setStoredToken } from '../../utils/token';

export const useAuthenticatePersonalIdentityNumber = (client, mutation) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authenticatePersonalIdentityNumber = useCallback(async (personalIdentityNumber) => {
    setIsAuthenticating(true);

    const { data } = await mutation({
      variables: {
        personalIdentityNumber,
      },
    });
    setStoredToken(data.authenticate.token);

    setIsAuthenticating(false);

    client.writeData({
      data: {
        isAuthenticated: true,
      },
    });
  }, [client, mutation]);

  return {
    authenticatePersonalIdentityNumber,
    isAuthenticating,
  };
};

export const useInputPersonalIdentityNumber = () => {
  const [personalIdentityNumber, setPersonalIdentityNumber] = useState('');
  const [validationStatus, setValidationStatus] = useState('validating');

  const onBlur = useCallback(() => {
    if (!isPersonalIdentityNumber(personalIdentityNumber)) {
      setValidationStatus('error');
    }
  }, [personalIdentityNumber]);

  const onChange = useCallback((value) => {
    if (!isPersonalIdentityNumber(value)) {
      setValidationStatus('validating');
    } else {
      setValidationStatus('success');
    }

    setPersonalIdentityNumber(value);
  }, []);

  return {
    onBlur,
    onChange,
    personalIdentityNumber,
    validationStatus,
  };
};
