import React from 'react';
import { mount, shallow } from 'enzyme';
import Calculator from './Calculator';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

describe("Calculator", () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<Calculator />)));

  it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot()
  });

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(1);
  });

  it('should render Display Component', () => {
      expect(wrapper.containsMatchingElement(
        <Display displayValue={wrapper.instance().state.displayValue} />
      )).toEqual(true);
  });

  it('should render Keypad Component', () => {
      expect(wrapper.containsMatchingElement(
          <Keypad 
              callOperator = {wrapper.instance().callOperator}
              numbers = {wrapper.instance().state.numbers}
              operators = {wrapper.instance().state.operators}
              extraOperators = {wrapper.instance().state.extraOperators}
              setOperator = {wrapper.instance().setOperator}
              updateDisplay = {wrapper.instance().updateDisplay}
          />
      )).toEqual(true);
  });
});

describe('mounted Calculator', () => {
  let wrapper;
  beforeEach(() => wrapper = mount(<Calculator />));

  it('should call updateDisplay when a number of key is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'updateDisplay');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.number-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call setOperator when an operator key is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'setOperator');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.operator-key').first().simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call callOperator when the submit key is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'callOperator');
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalledTimes(0);
      wrapper.find('.submit-key').simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);
  });
})

describe('updateDisplay', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<Calculator />));

  it('should update displayValue', () => {
    wrapper.instance().updateDisplay('1');
    expect(wrapper.state('displayValue')).toEqual('1');
  });

  it('should concatenate displayValue', () => {
    wrapper.instance().updateDisplay('1');
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('10');
  });

  it('should remove leading "0" from displayValue', () => {
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('0');
    wrapper.instance().updateDisplay('6');
    expect(wrapper.state('displayValue')).toEqual('6');
  });

  it('should prevent multiple leading "0"s from displayValue', () => {
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('0');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('should remove last char of displayValue', () => {
    wrapper.instance().updateDisplay('5');
    wrapper.instance().updateDisplay('0');
    wrapper.instance().updateDisplay('ac');
    expect(wrapper.state('displayValue')).toEqual('0');
  });

  it('should prevent multiple instances of "." in displayValue', () => {
    wrapper.instance().updateDisplay('.');
    wrapper.instance().updateDisplay('.');
    expect(wrapper.state('displayValue')).toEqual('.');
  });

  it('will set displayValue to "0" if displayValue is equal to an empty string', () => {
    wrapper.instance().updateDisplay('ac');
    expect(wrapper.state('displayValue')).toEqual('0');
  });
})

describe('setOperator', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('should update the value of selectedOperator', () => {
        wrapper.instance().setOperator('+');
        expect(wrapper.state('selectedOperator')).toEqual('+');
        wrapper.instance().setOperator('/');
        expect(wrapper.state('selectedOperator')).toEqual('/');
    });

    it('should update the value of storedValue to the value of displayValue', () => {
        wrapper.setState({displayValue:'5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
    });

    it('should update the value of displayValue to corresponding operator', () => {
        wrapper.setState({displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('displayValue')).toEqual('+');
    });

    it('selectedOperator is not an empty string, does not update storedValue', () => {
        wrapper.setState({displayValue: '5'});
        wrapper.instance().setOperator('+');
        expect(wrapper.state('storedValue')).toEqual('5');
        wrapper.instance().setOperator('-');
        expect(wrapper.state('storedValue')).toEqual('5');
    });
});

describe('callOperator', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<Calculator />));

    it('updates displayValue to the sum of storedValue and displayValue', () => {
        wrapper.setState({storedValue: '3'});
        wrapper.setState({displayValue: '3'});
        wrapper.setState({selectedOperator: '+'});
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('6');
    });

    it('updates displayValue to the difference of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '3' });
        wrapper.setState({ selectedOperator: '-' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
    
      it('updates displayValue to the product of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3.2' });
        wrapper.setState({ displayValue: '3' });
        wrapper.setState({ selectedOperator: 'x' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('9.60');
      });
    
      it('updates displayValue to the quotient of storedValue and displayValue', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: '2' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('1.50');
      });
    
      it('updates displayValue to "0" if operation results in "NaN"', () => {
        wrapper.setState({ storedValue: '3' });
        wrapper.setState({ displayValue: 'string' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
    
      it('updates displayValue to "0" if operation results in "Infinity"', () => {
        wrapper.setState({ storedValue: '7' });
        wrapper.setState({ displayValue: '0' });
        wrapper.setState({ selectedOperator: '/' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
    
      it('updates displayValue to "0" if selectedOperator does not match cases', () => {
        wrapper.setState({ storedValue: '7' });
        wrapper.setState({ displayValue: '10' });
        wrapper.setState({ selectedOperator: 'string' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
    
      it('updates displayValue to "0" if called with no value for storedValue or selectedOperator', () => {
        wrapper.setState({ storedValue: '' });
        wrapper.setState({ displayValue: '10' });
        wrapper.setState({ selectedOperator: '' });
        wrapper.instance().callOperator();
        expect(wrapper.state('displayValue')).toEqual('0');
      });
});
