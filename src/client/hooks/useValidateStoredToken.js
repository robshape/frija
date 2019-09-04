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

import { useEffect, useState } from 'react';

import getStoredToken from '../utils/token/getStoredToken';
import IS_AUTHENTICATED_MUTATION from '../graphql/mutations/IS_AUTHENTICATED_MUTATION';
import isTokenValid from '../utils/token/isTokenValid';
import removeStoredToken from '../utils/token/removeStoredToken';
import VALIDATE_QUERY from '../graphql/queries/VALIDATE_QUERY';

const useValidateStoredToken = ({ client }) => {
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateStoredToken = async () => {
      const token = getStoredToken();
      const isValidToken = isTokenValid(token);
      if (!isValidToken) {
        removeStoredToken();

        setIsValidating(false);
        return;
      }

      setIsValidating(true);

      const { data } = await client.query({
        query: VALIDATE_QUERY,
        variables: {
          token,
        },
      });

      setIsValidating(false);

      if (!data.validate) {
        removeStoredToken();
        return;
      }

      client.mutate({
        mutation: IS_AUTHENTICATED_MUTATION,
        variables: {
          isAuthenticated: true,
        },
      });
    };

    validateStoredToken();
  }, [client]);

  return isValidating;
};

export default useValidateStoredToken;
