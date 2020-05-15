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

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Heading from '../../components/Heading';
import ROUTER_PATH from '../../constants/ROUTER_PATH';
import styles from './ErrorScene.scss';
import Subheading from '../../components/Subheading';

const ErrorScene = () => (
  <div className={styles.errorScene}>
    <FontAwesomeIcon className={styles.errorScene__icon} icon={faExclamationTriangle} />

    <Heading>
      Hoppsan!
    </Heading>

    <Subheading>
      Något blev fel. Kan du&nbsp;
      <a className={styles.errorScene__link} href={ROUTER_PATH.HOME}>
        försöka igen
      </a>
      ?
    </Subheading>
  </div>
);

export default ErrorScene;