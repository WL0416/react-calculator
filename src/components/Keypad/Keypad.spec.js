import React from 'react';
import { mount, shallow } from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Keypad 
                callOperator = {jest.fn()}
                numbers = {[]}
                operators = {[]}
                setOperator = {jest.fn()}
                updateDisplay = {jest.fn()}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    it('should render four <div />s', () => {
        expect(wrapper.find('div').length).toEqual(4);
    });

    it('should render the Key component', () => {
        const numbers = ['0', '1'];
        const operators = ['+', '-'];
        const submit = 1;
        const keyTotal = numbers.length + operators.length + submit;
        wrapper.setProps({numbers, operators});
        expect(wrapper.find('Key').length).toEqual(keyTotal);
    });
});

describe('mounted Keypad', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
        <Keypad
            callOperator={jest.fn()}
            numbers={[]}
            operators={[]}
            setOperator={jest.fn()}
            updateDisplay={jest.fn()}
        />
        );  
    });
      
    it('should render the values of numbers to the DOM', () => {
        wrapper.setProps({ numbers: ['0', '1', '2'] })
        expect(wrapper.find('.numbers-container').text()).toEqual('012');
    });
      
    it('should render the values of operators to the DOM', () => {
        wrapper.setProps({ operators: ['+', '-', '*', '/'] });
        expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
    });
});