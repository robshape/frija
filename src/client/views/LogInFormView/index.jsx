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

import React from 'react';

import Button from './components/Button';
import Heading from './components/Heading';
import styles from './styles.scss';
import Subheading from './components/Subheading';
import TextInput from './components/TextInput';

export default React.memo(() => (
  <div className={styles.logInFormView}>
    <Heading>
      Hej,
    </Heading>
    <Subheading>
      identifiera dig med Mobilt BankID
    </Subheading>

    <div className={styles.logInFormView__form}>
      <TextInput maxLength={13} onKeyUp={() => {}} placeholder="Personnummer" />

      <div className={styles.logInFormView__logIn}>
        <Button onClick={() => {}}>
          Fortsätt
        </Button>
      </div>
    </div>
  </div>
));
