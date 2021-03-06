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

import { useEffect, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';

import IS_AUTHENTICATED_CLIENT_QUERY from '../graphql/queries/IS_AUTHENTICATED_CLIENT_QUERY';
import useValidateStoredToken from './useValidateStoredToken';

const useIsAuthenticatedClientQuery = () => {
  const [isAuthenticated, { data }] = useLazyQuery(IS_AUTHENTICATED_CLIENT_QUERY);
  const { loading: validateStoredTokenLoading, validateStoredToken } = useValidateStoredToken();

  const definedData = useMemo(() => (data === undefined ? {} : data), [data]);
  const loading = data === undefined || data.isAuthenticated === null || validateStoredTokenLoading;

  useEffect(() => isAuthenticated(), [isAuthenticated]);

  useEffect(() => {
    if (definedData.isAuthenticated !== null) return;
    if (validateStoredTokenLoading) return;

    validateStoredToken();
  }, [definedData, validateStoredToken, validateStoredTokenLoading]);

  return {
    data: definedData,
    loading,
  };
};

export default useIsAuthenticatedClientQuery;
