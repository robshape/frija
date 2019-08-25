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
import { shallow } from 'enzyme';

import App from '../../../../../src/client/scenes/App';

global.fetch = jest.fn();

describe('<App />', () => {
  const config = {
    graphqlUrl: 'test',
  };

  it('should render', () => { // TODO: https://github.com/airbnb/enzyme/issues/2011/
    const wrapper = shallow(<App config={config} />);

    expect(wrapper).toMatchSnapshot();
  });
});
