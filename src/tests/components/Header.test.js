import React from 'react';
import { shallow } from 'enzyme';
//import ReactShallowRenderer from 'react-test-renderer/shallow';
//import toJSON from 'enzyme-to-JSON';
import Header from '../../components/Header';

// shallow rendering: only render the given component
// full DOM rendering: also render child components

test('should render Header correctly', () =>  {
  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  // console.log(renderer.getRenderOutput());

  // ref: airbnb.io/enzyme/docs/api/shallow.html
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1').text()).toBe('Expensify');

  //expect(wrapper).toMatchSnapshot();  //this include lots of stuff we don't need
  //expect(toJSON(wrapper)).toMatchSnapshot();
  
  // with snapshotSerializers setup in jest.config.json, toJSON will be done automatically
  expect(wrapper).toMatchSnapshot();  
});


