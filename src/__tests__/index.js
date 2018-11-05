import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Substring from '../';

Enzyme.configure({ adapter: new Adapter() });

test('It works', () => {
    expect(true).toEqual(true);
});
