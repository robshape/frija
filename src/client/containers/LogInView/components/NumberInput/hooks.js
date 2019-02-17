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

import { useCallback, useMemo, useState } from 'react';
import uuidv4 from 'uuid/v4';

import { isNumber } from '../../../../utils/number';

export const useId = () => {
  const id = useMemo(
    () => uuidv4(),
    [],
  );
  return id;
};

export const useNumberInput = (onChangeCallback) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(({ target }) => {
    // 0 length probably means that the user has cleared the input.
    if (target.value.length !== 0
    && !isNumber(target.value)) {
      return;
    }

    setValue(target.value);

    onChangeCallback(target.value);
  }, [onChangeCallback]);

  return {
    onChange,
    value,
  };
};