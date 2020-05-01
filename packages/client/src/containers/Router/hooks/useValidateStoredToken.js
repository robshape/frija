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

import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';

import getStoredToken from '../../../utils/token/getStoredToken';
import isTokenValid from '../../../utils/token/isTokenValid';
import removeStoredToken from '../../../utils/token/removeStoredToken';
import setClientState from '../../../graphql/clientState/setClientState';
import VALIDATE_QUERY from '../../../graphql/queries/VALIDATE_QUERY';

const useValidateStoredToken = () => {
  const apolloClient = useApolloClient();
  const [validate, { data, error, loading }] = useLazyQuery(VALIDATE_QUERY);

  useEffect(() => {
    const token = getStoredToken();

    const isValidToken = isTokenValid(token);
    if (!isValidToken) {
      setClientState(apolloClient, 'isAuthenticated', false);
      removeStoredToken();
      return;
    }

    validate({
      variables: {
        token,
      },
    });
  }, [apolloClient, validate]);

  useEffect(() => {
    if (data) {
      if (data.validate) {
        setClientState(apolloClient, 'isAuthenticated', true);
      } else {
        setClientState(apolloClient, 'isAuthenticated', false);
        removeStoredToken();
      }
    }

    if (error) {
      setClientState(apolloClient, 'isAuthenticated', false);
      removeStoredToken();
    }
  }, [apolloClient, data, error]);

  return {
    isValidating: loading,
  };
};

export default useValidateStoredToken;
